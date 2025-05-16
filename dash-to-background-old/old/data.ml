type command = {
  id : string;
  command : string;
  restart : bool;
  status : string;
}
[@@deriving yaml]

type datarecord = { last_id : string; commands : command list }
[@@deriving yaml]

let data_dir_path = "data"
let data_file_path = data_dir_path ^ "/data.yml"
let archive_file_path = "archive.txt"

let serialize datarecord =
  let yaml = datarecord_to_yaml datarecord in
  match Yaml.to_string yaml with Ok s -> s | Error (`Msg e) -> failwith e

let deserialize s =
  let yaml = Yaml.of_string s in
  match yaml with
  | Ok yaml -> (
      match datarecord_of_yaml yaml with
      | Ok dr -> dr
      | Error (`Msg e) -> failwith e)
  | Error (`Msg e) -> failwith e

let save datarecord =
  let s = serialize datarecord in
  let oc = open_out data_file_path in
  Printf.fprintf oc "%s" s;
  close_out oc

let load () =
  let ic = open_in data_file_path in
  let s = really_input_string ic (in_channel_length ic) in
  close_in ic;
  deserialize s

let check_file () =
  if Sys.file_exists data_file_path then ()
  else
    let oc = open_out data_file_path in
    Printf.fprintf oc "%s" (serialize { last_id = "0"; commands = [] });
    close_out oc

let get_last_id () = (load ()).last_id

let add_command command =
  let datarecord = load () in
  let new_id = string_of_int (int_of_string datarecord.last_id + 1) in
  let new_command = { id = new_id; command; restart = false; status = "" } in
  let new_datarecord =
    { last_id = new_id; commands = new_command :: datarecord.commands }
  in
  save new_datarecord;
  new_id

let get_commands () = (load ()).commands

let get_command id =
  let commands = get_commands () in
  List.find (fun c -> c.id = id) commands

let set_command_status id status =
  let datarecord = load () in
  let commands =
    List.map
      (fun c -> if c.id = id then { c with status } else c)
      datarecord.commands
  in
  let new_datarecord = { datarecord with commands } in
  save new_datarecord

let set_command_status_running id = set_command_status id "running"
let set_command_status_stopped id = set_command_status id "stopped"
let set_command_status_errored id = set_command_status id "errored"

let add_command_to_archive command =
  let oc = open_out_gen [ Open_append; Open_creat ] 0o666 archive_file_path in
  Printf.fprintf oc "Time: %s\nID: %s\nCommand: %s\n\n"
    (Unix.time () |> string_of_float)
    command.id command.command;
  close_out oc

let remove_command id =
  let datarecord = load () in
  let commands = List.filter (fun c -> c.id <> id) datarecord.commands in
  let new_datarecord = { datarecord with commands } in
  save new_datarecord

let archive_command id =
  let command = get_command id in
  add_command_to_archive command;
  remove_command id

let get_running_commands () =
  let commands = get_commands () in
  List.filter (fun c -> c.status = "running") commands

let get_output_file id = Printf.sprintf "%s/outputs/%s.txt" data_dir_path id

let set_command_restart id restart =
  let datarecord = load () in
  let commands =
    List.map
      (fun c -> if c.id = id then { c with restart } else c)
      datarecord.commands
  in
  let new_datarecord = { datarecord with commands } in
  save new_datarecord

let get_shell () = "/bin/sh"
