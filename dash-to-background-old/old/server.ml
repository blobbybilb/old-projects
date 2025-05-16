open Ppx_yojson_conv_lib.Yojson_conv.Primitives

let run_new_command cmd restart =
  let id = Data.add_command cmd in
  let pid = Commands.run_get_pid Data.get_shell cmd id in
  Data.set_command_restart id restart;
  (id, pid)

let router =
  let id_to_pid_map : (string, int) Hashtbl.t = Hashtbl.create 10 in
  Dream.router
    [
      Dream.get "/list-commands" (fun _ -> Dream.respond "list-commands");
      Dream.get "/:word" (fun request ->
          Dream.html (Dream.param request "word"));
      Dream.get "/run-command" (fun request ->
          match Dream.query request "cmd" with
          | None -> Dream.respond "error: no command provided"
          | Some cmd ->
              let id, pid = run_new_command cmd false in
              Hashtbl.add id_to_pid_map id pid;
              Dream.respond
                (Printf.sprintf "command %s started with id %s" cmd id));
      Dream.get "/run-command-restart" (fun request ->
          match Dream.query request "cmd" with
          | None -> Dream.respond "error: no command provided"
          | Some cmd ->
              let id, pid = run_new_command cmd true in
              Hashtbl.add id_to_pid_map id pid;
              Dream.respond
                (Printf.sprintf "command %s started with id %s (auto restart)"
                   cmd id));
      Dream.get "/stop-command" (fun request ->
          match Dream.query request "id" with
          | None -> Dream.respond "error: no id provided"
          | Some id -> (
              match Hashtbl.find_opt id_to_pid_map id with
              | None -> Dream.respond "error: no such command id"
              | Some pid ->
                  Unix.kill pid Sys.sigterm;
                  Hashtbl.remove id_to_pid_map id;
                  Dream.respond (Printf.sprintf "command %s stopped" id)));
      Dream.get "/rerun-command" (fun request ->
          match Dream.query request "id" with
          | None -> Dream.respond "error: no id provided"
          | Some id -> (
              match Data.get_command id with
              | None -> Dream.respond "error: no such command id"
              | Some cmd ->
                  let id, pid = run_new_command cmd false in
                  Hashtbl.add id_to_pid_map id pid;
                  Dream.respond
                    (Printf.sprintf "command %s started with id %s" cmd id)));
    ]

let run () = Dream.run ~port:8080 @@ Dream.logger @@ router
