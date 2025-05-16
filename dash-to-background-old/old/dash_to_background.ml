let argsAfterFirst = Sys.argv |> Array.to_list |> List.tl

(* let () =
   match argsAfterFirst with
   | "background" :: _ -> Server.run ()
   (* -- -list # List running commands
      ID 100 | Reload: false | Command: <command> | Output file: <file> *)
   | "list" :: _ ->
       Data.get_running_commands ()
       |> List.iter (fun command ->
              print_endline
                ("ID " ^ command.id ^ " | Reload: " ^ string_of_bool command.restart
               ^ " | Command: " ^ command.command ^ " | Output file: "
               ^ ))
   | _ -> print_endline "-- REACHED _ IN MATCH --" *)

(* let () = Commands.runstuff *)
