import * as convertMetadata from './convertMetadata';
import * as datalakeTableStatusContrller from './datalakeTableStatusContrller';
import * as dwModelDesign from './dwModelDesign';
import * as enterHuOverview from './enterHuOverview';
import * as exportScript from './exportScript';
import * as generateScript from './generateScript';
import * as getSourceMetaData from './getSourceMetaData';
import * as hiveCreateTable from './hiveCreateTable';
import * as kafkaTest from './kafkaTest';

(window as any).API = {
  convertMetadata,
  datalakeTableStatusContrller,
  dwModelDesign,
  enterHuOverview,
  exportScript,
  generateScript,
  getSourceMetaData,
  hiveCreateTable,
  kafkaTest,
};
