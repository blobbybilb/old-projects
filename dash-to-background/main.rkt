#lang racket

(require racket/serialize)

; VARS
(define args (current-command-line-arguments))

(define data-dir "./data/")
(define archive-dir (string-append data-dir "archive/"))

(unless (not (vector-empty? args))
  (begin
    (display "No arguments provided\n")
    (exit)))

(unless (string-suffix? "/" data-dir)
  (set! data-dir (string-append data-dir "/")))
(unless (string-suffix? "/" archive-dir)
  (set! archive-dir (string-append archive-dir "/")))

(unless (directory-exists? data-dir)
  (make-directory data-dir))
(unless (directory-exists? archive-dir)
  (make-directory archive-dir))


; DATA
(serializable-struct command (id cmd restart status pid) #:transparent #:mutable)

(define (save-command command)
  (define file-path (string-append data-dir (command-id command)))
  (define out (open-output-file file-path #:exists 'replace))
  (write (serialize command) out)
  (close-output-port out))

(define (load-command id)
  (define file-path (string-append data-dir id))
  (define in (open-input-file file-path))
  (define cmd (read in))
  (close-input-port in)
  (deserialize cmd))

(define (archive-command id)
  (define command (load-command id))
  (define file-path (string-append data-dir (command-id command)))
  (define archive-path (string-append archive-dir (command-id command)))
  (copy-file file-path archive-path)
  (delete-file file-path))

(define (load-commands)
  (define files (directory-list data-dir))
  (path->string (car files))
  (define paths (map (lambda (file) (path->string file)) files))
  (define commandfiles (filter (lambda (path) (not (or (string=? path "archive") (string=? path "last-id")))) paths))
  commandfiles)


(define (status-running? command)
  (string=? (string-downcase (command-status command)) "running"))


(define (set-last-id id)
  (define file-path (string-append data-dir "last-id"))
  (define out (open-output-file file-path #:exists 'replace))
  (print id out)
  (close-output-port out))

(define (get-last-id)
  (define file-path (string-append data-dir "last-id"))
  (define in (open-input-file file-path))
  (define last-id (read in))
  (close-input-port in)
  last-id)

(define (get-next-id)

  (define last-id (get-last-id))
  (define next-id (string-append (number->string (+ (string->number last-id) 1) 10)))
  (set-last-id next-id)
  next-id)

(call-with-exception-handler
 (lambda (_)
   (set-last-id "100"))
 (lambda ()
   (void (get-last-id))))


; SHELL
(define (run-command command)
  (cond [(eq? (command-id command) "next")
         (set-command-id! command (get-next-id))])
  (define pid (list-ref (process (command-cmd command)) 2))
  (set-command-pid! command pid)
  (set-command-status! command "running")
  (save-command command))

(define (stop-command id)
  (define command (load-command id))
  (define pid (command-pid command))
  (system (format "kill ~a" pid))
  (set-command-status! command "stopped")
  (save-command command))

(define (is-running? command)
  (define pid (command-pid command))
  (define status (with-output-to-string (lambda () (system (format "ps -p ~a -o state=" pid)))))
  (or (string=? "R" (string-trim status))
      (string=? "S" (string-trim status))
      (string=? "D" (string-trim status))))

(define (resume-command id)
  (define command (load-command id))
  (println id)
  (unless (status-running? command)
    (display "Running \n")
    (run-command command)))

(define (rerun-command id)
  (stop-command id)
  (resume-command id))


; COMMANDS
(define (format-command command)
  (display (format "ID: ~a | CMD: ~a | Restarts: ~a | Status: ~a | PID: ~a\n"
                   (command-id command) (command-cmd command) (command-restart command) (command-status command) (command-pid command))))

(define (list-commands)
  (define commandfiles (load-commands))
  (define commands (map load-command commandfiles))
  (for-each (lambda (command) (format-command command)) commands))

(define (list-running-commands)
  (define commandfiles (load-commands))
  (define commands (map load-command commandfiles))
  (define running-commands (filter status-running? commands))
  (for-each (lambda (command) (format-command command)) running-commands))

(define (archive-stopped-commands)
  (define commandfiles (load-commands))
  (define commands (map load-command commandfiles))
  (define stopped-commands (filter (lambda (command) (string=? (command-status command) "stopped")) commands))
  (for-each (lambda (command) (archive-command (command-id command))) stopped-commands))


; BACKGROUND
(define (background-run)
  (define commandfiles (load-commands))
  (define commands (map load-command commandfiles))
  (define running-commands (filter status-running? commands))
  (define restarting-commands
    (filter (lambda (command) (eq? (command-restart command) true)) running-commands))
  (define non-restarting-commands
    (filter (lambda (command) (eq? (command-restart command) false)) running-commands))



  (for-each (lambda (command)
              (unless (is-running? command) (run-command command))) restarting-commands)
  (for-each (lambda (command)
              (unless (is-running? command) (stop-command (command-id command)))) non-restarting-commands))

(define (background-process interval)
  (background-run)
  (sleep interval)
  (background-process interval))

(define (get-arg1-or-default-interval)
  (if (< (vector-length args) 2)
      2
      (string->number (vector-ref args 1))))

; CLI
(match (vector-ref args 0)
  ["-list" (list-running-commands)]
  ["-listall" (list-commands)]
  ["-cleanup" (archive-stopped-commands)]
  ["-run" (resume-command (vector-ref args 1))]
  ["-stop" (stop-command (vector-ref args 1))]
  ["-rerun" (rerun-command (vector-ref args 1))]
  ["-background" (background-process (get-arg1-or-default-interval))]
  ["-archive" (archive-command (vector-ref args 1))]
  ["-help" 'hi]
  ["-restart" (run-command (command "next" (string-join (vector->list (vector-drop args 1)) " ") true "running" #f))]
  [_ (run-command (command "next" (string-join (vector->list args) " ") false "running" #f))])
