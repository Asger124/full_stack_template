import { useEffect, useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "~/components/ui/table"
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { EditIcon, PlusCircle, SaveIcon, Trash2Icon } from "lucide-react";


/* 
Documentation for data-table installed from shadcn-ui: https://ui.shadcn.com/docs/components/data-table

The components installed from shadcn are open for modification. 
They reside in the components directory at ./app/components 

*/

interface Row {
  id: number;
  type: string;
  color: string;
}

export default function EditableTable() {

  /* statuful component to update rows, which is our array
    Initilize the array with date from localstorage, if any.
    data from local storage is found through pathname key.
  
    Because of localstorage only existing on client side,
    a guard check ensures that it is only run on client side,
    with no guard rerender will throw exception.  */
 
  const [rows, setRows] = useState<Row[]>(() => {
  if (typeof window !== 'undefined') {

    const route = window.location.pathname
    const stored = localStorage.getItem(route);
    return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  //Runs when rows changes. Store the array rows in localstorage
  //ensures that data persists across page reloads 
  
  useEffect (() => {
    if (typeof window !== 'undefined') {
      const route = window.location.pathname
      localStorage.setItem(route, JSON.stringify(rows));
    }
  }, [rows]);


  //Editing id can either be null or a number
  const [editingId, setEditingId] = useState<number | null>(null);


  useEffect(() => {
    const beforeUnload = (event: BeforeUnloadEvent) => {

      if (editingId!=null) {
        const confirmation = window.confirm("You have unsaved changes, do you really want to leave?");
        
        //Confirmation returns bool based on user interaction. If user clicks "Genindlæs/ok" then it is set to true,
        //otherwise false. If it evaluates to false we prevent a reload and stay on page.
        if (!confirmation) {
          event.preventDefault(); 
        }
      }
  };
  window.addEventListener("beforeunload", beforeUnload);
    
  return () => {
    window.removeEventListener("beforeunload", beforeUnload);
  };
}, [editingId]);


  const handleAddRow = () => {
    const newRow: Row = { id: Date.now(), type: "", color: "" };
    setRows([...rows, newRow]);
    setEditingId(newRow.id);
  };

  //Match this with a row.id if editing

  const handleEdit = (id: number) => {
    setEditingId(id);
  };
 
  //create a new row object and set editing id to null
  const handleSave = (id: number, type: string, color: string) => {
    setRows(rows.map(row => row.id === id ? { ...row, type, color } : row));
    setEditingId(null);
  };
  
  // return rows without specific entry(id) in it
  const handleDelete = (id: number, name:string) => {
  const confirmed = window.confirm(`Er du sikker på at du vil slette "${name}"?`);
    if (confirmed) {
    setRows(rows.filter(row => row.id !== id));
    }
  };



  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="font-semibold text-gray-700 text-center mb-4"> 
        Velkommen til siden 'Lægetyper' <br /> 
        her kan du tilføje, redigere og slette lægetyper
      </h1>
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 overflow-auto max-h-[80vh] mb-30">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Lægetype</TableHead>
            <TableHead>Farve</TableHead>
            <TableHead>Rediger/Slet</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                {editingId === row.id ? (
                  <Input defaultValue={row.type} onChange={(e) => row.type = e.target.value} />
                ) : (
                  row.type
                )}
              </TableCell>

              <TableCell>
                {editingId === row.id ? (
                  <Input defaultValue={row.color} onChange={(e) => row.color = (e.target.value)} />
                ) : (
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300 ml-2"
                        style={{ backgroundColor: row.color.toLowerCase() }}
                      />
                    </div>
                )}
              </TableCell>

              <TableCell>
                {editingId === row.id ? (
                  <Button className="hover:cursor-pointer"size="sm" onClick={() => handleSave(row.id, row.type, row.color)}>
                    <SaveIcon /></Button>
                ) : (
                  <>
                    <Button className="hover:cursor-pointer" variant= "secondary"  onClick={() => handleEdit(row.id)}>
                      <EditIcon /></Button>
                    <Button className="ml-2 hover:cursor-pointer" variant="destructive" size="sm" onClick={() => handleDelete(row.id, row.type)}>
                      <Trash2Icon /></Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button className="flex-justify-end mt-4 hover:cursor-pointer" variant="outline" onClick={handleAddRow}> <PlusCircle />Tilføj her</Button>
    </div>
    </div>
  );
  }

