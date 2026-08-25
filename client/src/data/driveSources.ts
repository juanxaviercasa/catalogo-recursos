export type DriveSource = {
  id: string;
  account: string;
  label: string;
  folderUrl: string;
  indexedCount: number;
};

// Registro extensible: añade aquí nuevas cuentas de Drive cuando se integren más orígenes.
export const driveSources: DriveSource[] = [
  {
    id: "cofredelemprendedor",
    account: "cofredelemprendedor@gmail.com",
    label: "Fuente personal de Drive",
    folderUrl: "https://drive.google.com/drive/folders/1-Ji4Gevs5bv7CjkQ34uKm1pi6DYlf0KL",
    indexedCount: 263,
  },
  {
    id: "materialesrecursos52",
    account: "materialesrecursos52@gmail.com",
    label: "Biblioteca compartida de plantillas web",
    folderUrl: "https://drive.google.com/drive/folders/1SR8ktuNbLOzxtpp4YHO6ApRF2FQeIxOR",
    indexedCount: 46,
  },
  {
    id: "materialesrecursos53",
    account: "materialesrecursos53@gmail.com",
    label: "Biblioteca compartida Diversos",
    folderUrl: "https://drive.google.com/drive/folders/1w4dhYf5JjmMDeaXTRHnZTR00zS4rz-wW",
    indexedCount: 317,
  },
  {
    id: "juanxaviercasa",
    account: "juanxaviercasa@gmail.com",
    label: "Materiales Diversos · biblioteca personal",
    folderUrl: "https://drive.google.com/drive/folders/11fXUqfBt3zcbl5I5EkO92BiLBgTT2xOj",
    indexedCount: 218,
  },
  {
    id: "latamecommerce247",
    account: "latamecommerce247@gmail.com",
    label: "Webs · biblioteca de temas ecommerce y CMS",
    folderUrl: "https://drive.google.com/drive/folders/18zv26Uoyb7lUGvlPIyvbBS1Ntz2n5F5-",
    indexedCount: 574,
  },
];

export const defaultDriveSource = driveSources[0];
export const getDriveSource = (id?: string) => driveSources.find((source) => source.id === id) ?? defaultDriveSource;
