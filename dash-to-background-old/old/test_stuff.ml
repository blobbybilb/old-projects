(* let example : Data.datarecord =
     {
       last_id = "2";
       commands =
         [
           {
             id = "1";
             command = "echo 'hello'";
             restart = false;
             status = "running";
           };
           {
             id = "2";
             command = "echo 'world'";
             restart = false;
             status = "running";
           };
         ];
     }

   let x = example |> Data.serialize
   let y = Data.serialize example |> Data.deserialize |> Data.serialize
   let () = print_endline (x = y |> string_of_bool)
   let () = Data.save example
   let z = Data.load ()
   let () = print_endline (z = example |> string_of_bool) *)
