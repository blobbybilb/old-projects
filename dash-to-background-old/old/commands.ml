let id_to_pid_table : (string, int) Hashtbl.t = Hashtbl.create 10
let shell = "/bin/sh"

let run_get_pid shell cmd out =
  let out_descr =
    Unix.openfile out [ Unix.O_RDWR; Unix.O_CREAT; Unix.O_APPEND ] 0o640
  in

  let null_input = Unix.openfile "/dev/null" [ O_RDONLY ] 0o000 in

  Unix.create_process shell [| shell; "-c"; cmd |] null_input out_descr
    out_descr
