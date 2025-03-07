import { useState } from "react";
import { DataGrid, GridRowsProp, GridColDef, GridRowId } from "@mui/x-data-grid";
import { Trash2, PlusCircle, XCircle } from "lucide-react";
 // Example colors

export default function DoctorTypes() {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [nextId, setNextId] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [newDoctorType, setNewDoctorType] = useState("");
  const [selectedColor, setSelectedColor] = useState(""); // Default color

  const handleAddRow = () => {
    if (!newDoctorType) return;
    setRows([...rows, { id: nextId, col1: newDoctorType, col2: selectedColor }]);
    setNextId(nextId + 1);
    setNewDoctorType("");
    setSelectedColor("");
    setShowForm(false);
  };

  const handleDeleteRow = (id: GridRowId) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const columns: GridColDef[] = [
    { field: "col1", headerName: "LægeTyper", width: 200, editable: true },
    {
      field: "col2",
      headerName: "Farve",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <div className="flex items-center space-x-2">
          <div
            className="w-6 h-6 rounded-full border border-gray-400"
            style={{ backgroundColor: params.value }}
          ></div>
          <span>{params.value}</span>
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <div className="flex items-center space-x-2 pt-2.5">
            <Trash2
            className="text-red-500 hover:text-red-700 cursor-pointer"
            onClick={() => handleDeleteRow(params.id)}
            />
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center h-screen pt-10 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 text-center">
        Velkommen til LægePortalen!
      </h1>

      {/* Add Row Button */}
      <PlusCircle
        className="text-blue-500 hover:text-blue-700 cursor-pointer w-10 h-10"
        onClick={() => setShowForm(true)}
      />

      {/* Data Grid */}
      <div style={{ height: 400, width: "50%" }}>
        <DataGrid rows={rows} columns={columns} editMode="cell" />
      </div>

      {/* Modal for Adding New Entry */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4">
            <h2 className="text-xl font-semibold">Tilføj Lægetype</h2>

            <input
              type="text"
              placeholder="LægeTyper"
              value={newDoctorType}
              onChange={(e) => setNewDoctorType(e.target.value)}
              className="w-full p-2 border rounded"
            />

            {/* Color Selection */}
            <input
              type="text"
              placeholder="Farve"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full p-2 border rounded"
            />

            <div className="flex justify-between">
              {/* Close Button */}
              <XCircle
                className="text-gray-500 hover:text-gray-700 cursor-pointer w-8 h-8"
                onClick={() => setShowForm(false)}
              />

              {/* Confirm Add Button */}
              <PlusCircle
                className="text-green-500 hover:text-green-700 cursor-pointer w-8 h-8"
                onClick={handleAddRow}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

