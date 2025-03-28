import { ReactHTMLElement, useEffect, useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "~/components/ui/table"
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { EditIcon, PlusCircle, SaveIcon, Trash2Icon } from "lucide-react";
import InfoBox from "~/components/ui/infobox";

/* 
Documentation for data-table installed from shadcn-ui: https://ui.shadcn.com/docs/components/data-table

The components installed from shadcn are open for modification. 
They reside in the components directory at ./app/components 

*/
enum DoctorTypes{
  Senior = "Overlæge",
  DepartmentDoctor = "Afdelingslæge",
  FirstResTemp = "1.res.vikar",
  KThreeFour = "K3/4", 
  KOne = "K1",
  Intro = "Intro",
  ResTemp  = "Res.vik",
}

interface Row {
  id: number;
  name: string;
  tag: string;
  Initials:string;
  email: string;
  type:DoctorTypes; 
  capacity: number;
  Status:string;
}

export default function EditableTable() {


  /* statuful component to update rows, which is our array
    Initilize the array with date from localstorage, if any.
    data from local storage is found through pathname key.
  
    Because of localstorage only existing on client side,
    a guard check ensures that it is only run on client side,
    with no guard rerender will throw exception.  */

  const [rows, setRows] = useState<Row[]>(() => {
    //ensure to only run on client side
    if(typeof window !== 'undefined' ){

      const route = window.location.pathname;
      const stored = localStorage.getItem(route);
      return  stored ? JSON.parse(stored) :[];
    };
    return [];
  });

  const [editingId, setEditingId] = useState<number | null>(null);

  const[originalRow, setOrignalRow] = useState<Row| null>(null); 

  const[checkBox,setCheckBox] = useState("");
   
  //Runs when rows changes. Store the array rows in localstorage
  //ensures that data persists across page reloads 
  
  useEffect (() => {
      if (typeof window !== 'undefined') {
        const route = window.location.pathname;
        localStorage.setItem(route, JSON.stringify(rows));
      }
    }, [rows]);

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


  const handleCheck = (id:number, checked:boolean) => {
    if(editingId!=null) {
    setRows(rows.map(row => row.id === id ? { ...row, Status : checked? "Active" : "Inactive" } : row));
    } 

  }

  const handleAddRow = () => {
    const newRow: Row = { id: Date.now(), name: "", Initials:"", tag:"",  email: "", type: DoctorTypes.ResTemp, capacity: 0, Status : "Inactive"};
    setRows([...rows, newRow]);
    setEditingId(newRow.id);
    setCheckBox(newRow.Status);
  };


  
  
  /* 
  Two main 'branches' that handleEdit can take. 
  First branch: Check the editingId and if its not null and it is different from the id given to the method(meaning the user tries to edit another row, before saving), 
  take action. The confirm box will appear and if the user confirms, the method will save changes made in the current row, 
  if user does not confirm, call handleAbort(check doc for handleAbort) and return.

  Second branch: if the user is editing a row that is different from the editingID, make sure to set the checbox of this row equal to status, 
  and save the data for this row in case it is needed for handleAbort
  */

  const handleEdit = (id: number) => {

    if(editingId!= null && editingId !==id) {
   
    const confirm = window.confirm(`Hov! Du er i gang med at redigere en lægetype. Vil du gemme dine ændringer?`);
    if(confirm){

    const currentRow = rows.find((row) => row.id === editingId);
    if (currentRow) 
      
    handleSave(editingId,currentRow.name,currentRow.Initials,currentRow.email,currentRow.type,currentRow.capacity,checkBox);
    } else {
      handleAbort(editingId)
      return; 
    }

  } else {
    const rowToEdit = rows.find((row) => row.id === id);
    if (rowToEdit) {
      setCheckBox(rowToEdit.Status);
      setOrignalRow({...rowToEdit}); // Save the original type value
      
    }
    setEditingId(id);
    };
  }
  
  
  const handleSave = (id: number, name: string, init:string, email: string, type:DoctorTypes, capacity:number, stattus:string) => {

    setRows(rows.map(row => row.id === id ? { ...row, name, init, email, type, capacity, Status:stattus} : row));
    setEditingId(null);
    setOrignalRow(null);
  };

  /* 
  HandleAbort will check the controlled variable originalRow, 
  and based on the row id it was given, revert the data for that corresponding row.
  */

  const handleAbort = (id:number) => {
    if (originalRow) {
      // Revert to the original row state
      setRows(rows.map(row => row.id === id ? originalRow : row));
    }
    setEditingId(null); // Stop editing
    setOrignalRow(null); // Clear the original row after abort
  };


  // return rows without specific entry(id) in it 
  const handleDelete = (id: number, name:string) => {
    const confirmed = window.confirm(`Er du sikker på at du vil slette "${name}"?`);
      if (confirmed) {
      setRows(rows.filter(row => row.id !== id));
      }
      setEditingId(null);
    };

    const handleKeyDown = (event:React.KeyboardEvent<HTMLTableRowElement>, id:number,name:string,initialer:string,email:string, type:DoctorTypes, capacity:number, status:string) => {
      if(event.key == "Enter") {
        handleSave(id,name,initialer,email, type, capacity, status);
      } else if (event.key == "Escape"){
        handleAbort(id);
      } else if (event.key == "Delete") {
        handleDelete(id,type); 
      }
      
    };
  
    useEffect(() => {
      const handleGlobalKeyDown = (event: KeyboardEvent) => {

        if ( (event.ctrlKey || event.metaKey) && event.key === 'a') {
          event.preventDefault(); // Prevent default (new tab behavior)
          handleAddRow(); // Add a new row
        }
      };
  
      // Attach event listener for global keyboard shortcuts (Ctrl + N)
      window.addEventListener('keydown', handleGlobalKeyDown);
  
      // Cleanup on component unmount
      return () => {
        window.removeEventListener('keydown', handleGlobalKeyDown);
      };
    }, [rows]);
  

  return (
    <div className="flex flex-col justify-center items-center ml-50 h-screen mt-8">
      <InfoBox message="Velkommen til vores læger. Her på siden kan du gøre en masse forskellige sjove ting"></InfoBox>
      
      <div className=" w-full max-w-6xl bg-white shadow-lg rounded-lg p-6 overflow-auto max-h-[80vh] mb-30">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Navn</TableHead>
            <TableHead>Initialer</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Kapacitet</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Rediger/Slet</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} onKeyDown={(e)=> handleKeyDown(e,row.id,row.name,row.Initials,row.email,row.type,row.capacity,checkBox)}>
              <TableCell>
                {editingId === row.id ? (
                  <Input defaultValue={row.name} onChange={(e) => row.name = e.target.value} />
                ) : (
                  row.name
                )}
              </TableCell>
              <TableCell>
                {editingId === row.id ? (
                  <Input className="w-24" defaultValue={row.Initials} onChange={(e) => row.Initials = e.target.value} />
                ) : (
                  row.Initials
                )}
              </TableCell>

              <TableCell>
 
                {editingId === row.id ? (
                  <Input
                  type = "email" pattern=".+@region\.com" 
                  title="Mailen skal indeholde @region.com"
                  defaultValue = {row.email} 
                  onChange={(e) =>{ row.email = e.target.value; 
                    const emailInput = e.target; emailInput.reportValidity();}} />
                ) : (
                    row.email
                )}
              </TableCell>

              <TableCell>
                {editingId === row.id ? (
                  <select defaultValue={row.type} onChange={(e) => row.type = e.target.value as DoctorTypes}
                  >
                    {Object.values(DoctorTypes).map((doctor) => (
                    <option key={doctor} value={doctor}>
                      {doctor}
                    </option>
                  ))}
                </select>
                ) : (
                    row.type
                )}
              </TableCell>

              <TableCell>
                {editingId === row.id ? (
                  <Input className ="w-20"type = "number" defaultValue={row.capacity} onChange={(e) => row.capacity = e.target.valueAsNumber} />
                ) : (
                    row.capacity
                )}
              </TableCell>

              <TableCell>
                {editingId === row.id ? (
                  <Input className="w-10" type ="checkbox" checked={checkBox === "Active"} onChange={(e) => setCheckBox(e.target.checked? "Active" : "Inactive")} />
                ) : (
                    row.Status
                )}
              </TableCell>
              
              <TableCell>
                {editingId === row.id ? (
                  <Button className="hover:cursor-pointer"size="sm" onClick={() => handleSave(row.id, row.name,row.Initials, row.email, row.type, row.capacity,checkBox)}>
                    <SaveIcon /></Button>
                ) : (
                  <>
                    <Button className="hover:cursor-pointer" variant= "secondary"  onClick={() => handleEdit(row.id)}>
                      <EditIcon /></Button>
                    <Button className="ml-2 hover:cursor-pointer" variant="destructive" size="sm" onClick={() => handleDelete(row.id,row.name)}>
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