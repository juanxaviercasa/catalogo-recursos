export type DriveSource = {
  id: string;
  account: string;
  label: string;
  folderUrl: string;
};

// Registro extensible: añade aquí nuevas cuentas de Drive cuando se integren más orígenes.
export const driveSources: DriveSource[] = [
  {
    id: "cofredelemprendedor",
    account: "cofredelemprendedor@gmail.com",
    label: "Fuente personal de Drive",
    folderUrl: "https://drive.google.com/drive/folders/1-Ji4Gevs5bv7CjkQ34uKm1pi6DYlf0KL",
  },
  {
    id: "materialesrecursos52",
    account: "materialesrecursos52@gmail.com",
    label: "Biblioteca compartida de plantillas web",
    folderUrl: "https://drive.google.com/drive/folders/1SR8ktuNbLOzxtpp4YHO6ApRF2FQeIxOR",
  },
];

export const defaultDriveSource = driveSources[0];
export const getDriveSource = (id?: string) => driveSources.find((source) => source.id === id) ?? defaultDriveSource;
