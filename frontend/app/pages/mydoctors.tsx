import { ReactHTMLElement, useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "~/components/ui/table"
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { EditIcon, PlusCircle, SaveIcon, Trash2Icon } from "lucide-react";

interface Row {
  id: number;
  name: string;
  email: string;
  type:string; 
}

export default function EditableTable() {

  const [rows, setRows] = useState<Row[]>([ { id: 1, name: "John Doe", email: "", type: "" } ]);
  const [editingId, setEditingId] = useState<number | null>(null);


  const handleAddRow = () => {
    const newRow: Row = { id: Date.now(), name: "", email: "", type: "" };
    setRows([...rows, newRow]);
    setEditingId(newRow.id);
  };



  const handleEdit = (id: number) => {
    setEditingId(id);
  };

  const handleSave = (id: number, name: string, email: string, type:string) => {
    setRows(rows.map(row => row.id === id ? { ...row, name, email, type } : row));
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    setRows(rows.filter(row => row.id !== id));
  };
  

  return (
    <div className="flex flex-col justify-center items-center h-screen  bg-gray-100">
      <h1 className="font-semibold text-gray-900 text-center pb-15"> 
        Velkommen til siden 'Lægetyper' <br /> 
        her kan du tilføje, redigere og slette lægetyper
      </h1>
      <div className=" w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 overflow-auto max-h-[80vh]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Navn</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Rediger/Slet</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                {editingId === row.id ? (
                  <Input defaultValue={row.name} onChange={(e) => row.name = e.target.value} />
                ) : (
                  row.type
                )}
              </TableCell>
              <TableCell>
                {editingId === row.id ? (
                  <Input
                  type = "email" defaultValue = {row.email} onChange={(e) => row.email = e.target.value} />
                ) : (
                    row.email
                )}
              </TableCell>
              <TableCell>
                {editingId === row.id ? (
                  <Input defaultValue={row.type} onChange={(e) => row.type = (e.target.value)} />
                ) : (
                    row.type
                )}
              </TableCell>
              <TableCell>
                {editingId === row.id ? (
                  <Button className="hover:cursor-pointer"size="sm" onClick={() => handleSave(row.id, row.name, row.email, row.type)}>
                    <SaveIcon /></Button>
                ) : (
                  <>
                    <Button className="hover:cursor-pointer" variant= "secondary"  onClick={() => handleEdit(row.id)}>
                      <EditIcon /></Button>
                    <Button className="ml-2 hover:cursor-pointer" variant="destructive" size="sm" onClick={() => handleDelete(row.id)}>
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