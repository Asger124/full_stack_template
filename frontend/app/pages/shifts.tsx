import { useEffect, useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "~/components/ui/table"
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { EditIcon, PlusCircle, SaveIcon, Trash2Icon } from "lucide-react";

interface Row {
  id: number;
  name: string;
  StartTime: string;
  Endtime: string;
  color: string;
}

export default function EditableTable() {

  const [editingId, setEditingId] = useState<number | null>(null);

  const [rows, setRows] = useState<Row[]>(() => {
      if(typeof window !== 'undefined' ){
  
        const route = window.location.pathname;
        const stored = localStorage.getItem(route);
        return  stored ? JSON.parse(stored) :[];
      };
      return [];
    });
  
    useEffect (() => {
        if (typeof window !== 'undefined') {
          const route = window.location.pathname;
          localStorage.setItem(route, JSON.stringify(rows));
        }
      }, [rows]);


  const handleAddRow = () => {
    const newRow: Row = { id: Date.now(), name: "", StartTime: "", Endtime: "", color: "" };
    setRows([...rows, newRow]);
    setEditingId(newRow.id);
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
  };

  const handleSave = (id: number, name: string, StartTime:string, color: string) => {
    setRows(rows.map(row => row.id === id ? { ...row, name, StartTime, color } : row));
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    setRows(rows.filter(row => row.id !== id));
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="font-semibold text-gray-700 text-center mb-4"> 
        Velkommen til siden 'Vagttyper' <br /> 
        her kan du tilføje, redigere og slette vagttyper
      </h1>
      <div className=" w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 overflow-auto max-h-[80vh] mb-30">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Navn</TableHead>
            <TableHead>Tidspunkt</TableHead>
            <TableHead>Farve</TableHead>
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
                  row.name
                )}
              </TableCell>
              <TableCell>
                {editingId === row.id ? (
                  <div className="flex items-center gap-2">
                    <Input
                      type="time"
                      defaultValue={row.StartTime} onChange={(e) => row.StartTime = e.target.value}
                      className="text-center"
                    />
                    <span>-</span>
                    <Input
                      type="time" defaultValue={row.Endtime} onChange={(e)=> row.Endtime = e.target.value}
                      className="text-center"
                    />
                  </div>
                ) : (
                  `${row.StartTime} - ${row.Endtime}`
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
                  <Button className="hover:cursor-pointer"size="sm" onClick={() => handleSave(row.id, row.name, row.StartTime, row.color)}>
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
