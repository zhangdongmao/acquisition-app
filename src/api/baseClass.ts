export class CellStyle {
  /** alignment */
  alignment = 'GENERAL';

  /** alignmentEnum */
  alignmentEnum = 'GENERAL';

  /** borderBottom */
  borderBottom = 'NONE';

  /** borderBottomEnum */
  borderBottomEnum = 'NONE';

  /** borderLeft */
  borderLeft = 'NONE';

  /** borderLeftEnum */
  borderLeftEnum = 'NONE';

  /** borderRight */
  borderRight = 'NONE';

  /** borderRightEnum */
  borderRightEnum = 'NONE';

  /** borderTop */
  borderTop = 'NONE';

  /** borderTopEnum */
  borderTopEnum = 'NONE';

  /** bottomBorderColor */
  bottomBorderColor = undefined;

  /** dataFormat */
  dataFormat = undefined;

  /** dataFormatString */
  dataFormatString = '';

  /** fillBackgroundColor */
  fillBackgroundColor = undefined;

  /** fillBackgroundColorColor */
  fillBackgroundColorColor = new Color();

  /** fillForegroundColor */
  fillForegroundColor = undefined;

  /** fillForegroundColorColor */
  fillForegroundColorColor = new Color();

  /** fillPattern */
  fillPattern = 'NO_FILL';

  /** fillPatternEnum */
  fillPatternEnum = 'NO_FILL';

  /** font */
  font = new Font();

  /** fontIndex */
  fontIndex = undefined;

  /** hidden */
  hidden = false;

  /** indention */
  indention = undefined;

  /** index */
  index = undefined;

  /** leftBorderColor */
  leftBorderColor = undefined;

  /** locked */
  locked = false;

  /** quotePrefixed */
  quotePrefixed = false;

  /** rightBorderColor */
  rightBorderColor = undefined;

  /** rotation */
  rotation = undefined;

  /** shrinkToFit */
  shrinkToFit = false;

  /** topBorderColor */
  topBorderColor = undefined;

  /** verticalAlignment */
  verticalAlignment = 'TOP';

  /** verticalAlignmentEnum */
  verticalAlignmentEnum = 'TOP';

  /** wrapText */
  wrapText = false;
}

export class CjDataSourceSystemInfo {
  /** businessSystemId */
  businessSystemId = '';

  /** businessSystemNameShortName */
  businessSystemNameShortName = '';

  /** dataSourceSchema */
  dataSourceSchema = '';

  /** lastModifyBy */
  lastModifyBy = '';

  /** lastModifyDt */
  lastModifyDt = '';
}

export class CjDataSourceTabInfo {
  /** businessSystemId */
  businessSystemId = '';

  /** businessSystemNameShortName */
  businessSystemNameShortName = '';

  /** dataFlagForCrtDwDll */
  dataFlagForCrtDwDll = '';

  /** dataFlagForCrtDwHive */
  dataFlagForCrtDwHive = '';

  /** dataFlagForCrtDwScript */
  dataFlagForCrtDwScript = '';

  /** dataFlagForCrtOdsDll */
  dataFlagForCrtOdsDll = '';

  /** dataFlagForCrtOdsHive */
  dataFlagForCrtOdsHive = '';

  /** dataFlagForCrtOdsScript */
  dataFlagForCrtOdsScript = '';

  /** dataFlagForGetCols */
  dataFlagForGetCols = '';

  /** dataFlagForGetRows */
  dataFlagForGetRows = '';

  /** dataSourceSchema */
  dataSourceSchema = '';

  /** dataSourceTable */
  dataSourceTable = '';

  /** dataSourceTableComment */
  dataSourceTableComment = '';

  /** date */
  date = '';

  /** dwCount */
  dwCount = '';

  /** lastModifyBy */
  lastModifyBy = '';

  /** lastModifyDt */
  lastModifyDt = '';

  /** odsCount */
  odsCount = '';

  /** tableCount */
  tableCount = '';
}

export class Color {}

export class EtuInfo {
  /** 源系统缩写 */
  businessSystemNameShortName = '';

  /** cellStyleMap */
  cellStyleMap = undefined;

  /** dataSourceSchema */
  dataSourceSchema = '';

  /** 源表名 */
  dataSourceTable = '';

  /** index */
  index = '';

  /** metaStatus */
  metaStatus = '';
}

export class ExclePropertyModel {
  /** businessSystemNameShortName */
  businessSystemNameShortName = '';

  /** cellStyleMap */
  cellStyleMap = undefined;

  /** dataSourceSchema */
  dataSourceSchema = '';

  /** date */
  date = '';

  /** dwCount */
  dwCount = '';

  /** odsCount */
  odsCount = '';

  /** tableCount */
  tableCount = '';
}

export class Font {
  /** bold */
  bold = false;

  /** color */
  color = undefined;

  /** fontHeight */
  fontHeight = undefined;

  /** fontHeightInPoints */
  fontHeightInPoints = undefined;

  /** fontName */
  fontName = '';

  /** index */
  index = undefined;

  /** italic */
  italic = false;

  /** strikeout */
  strikeout = false;

  /** typeOffset */
  typeOffset = undefined;

  /** underline */
  underline = '';
}

export class Page {
  /** pagenum */
  pagenum = undefined;

  /** pagesize */
  pagesize = undefined;

  /** query */
  query = [];
}

export class PageGeorge {
  /** 当前页数 */
  pagenum = undefined;

  /** 页面大小 */
  pagesize = undefined;

  /** 数据 */
  query = [];
}

export class Result {
  /** 返回状态码 */
  code = undefined;

  /** 返回data */
  data = undefined;

  /** 提示信息 */
  msg = '';
}

export class ViewSourceSystemEntity {
  /** business_system_ID */
  business_system_ID = '';

  /** business_system_name_short_name */
  business_system_name_short_name = '';

  /** data_base_type */
  data_base_type = '';

  /** status */
  status = '';
}
