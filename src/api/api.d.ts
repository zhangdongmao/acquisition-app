type ObjectMap<Key extends string | number | symbol = any, Value = any> = {
  [key in Key]: Value
};

declare namespace defs {
  export class CellStyle {
    /** alignment */
    alignment?:
      | 'GENERAL'
      | 'LEFT'
      | 'CENTER'
      | 'RIGHT'
      | 'FILL'
      | 'JUSTIFY'
      | 'CENTER_SELECTION'
      | 'DISTRIBUTED';

    /** alignmentEnum */
    alignmentEnum?:
      | 'GENERAL'
      | 'LEFT'
      | 'CENTER'
      | 'RIGHT'
      | 'FILL'
      | 'JUSTIFY'
      | 'CENTER_SELECTION'
      | 'DISTRIBUTED';

    /** borderBottom */
    borderBottom?:
      | 'NONE'
      | 'THIN'
      | 'MEDIUM'
      | 'DASHED'
      | 'DOTTED'
      | 'THICK'
      | 'DOUBLE'
      | 'HAIR'
      | 'MEDIUM_DASHED'
      | 'DASH_DOT'
      | 'MEDIUM_DASH_DOT'
      | 'DASH_DOT_DOT'
      | 'MEDIUM_DASH_DOT_DOT'
      | 'SLANTED_DASH_DOT';

    /** borderBottomEnum */
    borderBottomEnum?:
      | 'NONE'
      | 'THIN'
      | 'MEDIUM'
      | 'DASHED'
      | 'DOTTED'
      | 'THICK'
      | 'DOUBLE'
      | 'HAIR'
      | 'MEDIUM_DASHED'
      | 'DASH_DOT'
      | 'MEDIUM_DASH_DOT'
      | 'DASH_DOT_DOT'
      | 'MEDIUM_DASH_DOT_DOT'
      | 'SLANTED_DASH_DOT';

    /** borderLeft */
    borderLeft?:
      | 'NONE'
      | 'THIN'
      | 'MEDIUM'
      | 'DASHED'
      | 'DOTTED'
      | 'THICK'
      | 'DOUBLE'
      | 'HAIR'
      | 'MEDIUM_DASHED'
      | 'DASH_DOT'
      | 'MEDIUM_DASH_DOT'
      | 'DASH_DOT_DOT'
      | 'MEDIUM_DASH_DOT_DOT'
      | 'SLANTED_DASH_DOT';

    /** borderLeftEnum */
    borderLeftEnum?:
      | 'NONE'
      | 'THIN'
      | 'MEDIUM'
      | 'DASHED'
      | 'DOTTED'
      | 'THICK'
      | 'DOUBLE'
      | 'HAIR'
      | 'MEDIUM_DASHED'
      | 'DASH_DOT'
      | 'MEDIUM_DASH_DOT'
      | 'DASH_DOT_DOT'
      | 'MEDIUM_DASH_DOT_DOT'
      | 'SLANTED_DASH_DOT';

    /** borderRight */
    borderRight?:
      | 'NONE'
      | 'THIN'
      | 'MEDIUM'
      | 'DASHED'
      | 'DOTTED'
      | 'THICK'
      | 'DOUBLE'
      | 'HAIR'
      | 'MEDIUM_DASHED'
      | 'DASH_DOT'
      | 'MEDIUM_DASH_DOT'
      | 'DASH_DOT_DOT'
      | 'MEDIUM_DASH_DOT_DOT'
      | 'SLANTED_DASH_DOT';

    /** borderRightEnum */
    borderRightEnum?:
      | 'NONE'
      | 'THIN'
      | 'MEDIUM'
      | 'DASHED'
      | 'DOTTED'
      | 'THICK'
      | 'DOUBLE'
      | 'HAIR'
      | 'MEDIUM_DASHED'
      | 'DASH_DOT'
      | 'MEDIUM_DASH_DOT'
      | 'DASH_DOT_DOT'
      | 'MEDIUM_DASH_DOT_DOT'
      | 'SLANTED_DASH_DOT';

    /** borderTop */
    borderTop?:
      | 'NONE'
      | 'THIN'
      | 'MEDIUM'
      | 'DASHED'
      | 'DOTTED'
      | 'THICK'
      | 'DOUBLE'
      | 'HAIR'
      | 'MEDIUM_DASHED'
      | 'DASH_DOT'
      | 'MEDIUM_DASH_DOT'
      | 'DASH_DOT_DOT'
      | 'MEDIUM_DASH_DOT_DOT'
      | 'SLANTED_DASH_DOT';

    /** borderTopEnum */
    borderTopEnum?:
      | 'NONE'
      | 'THIN'
      | 'MEDIUM'
      | 'DASHED'
      | 'DOTTED'
      | 'THICK'
      | 'DOUBLE'
      | 'HAIR'
      | 'MEDIUM_DASHED'
      | 'DASH_DOT'
      | 'MEDIUM_DASH_DOT'
      | 'DASH_DOT_DOT'
      | 'MEDIUM_DASH_DOT_DOT'
      | 'SLANTED_DASH_DOT';

    /** bottomBorderColor */
    bottomBorderColor?: number;

    /** dataFormat */
    dataFormat?: number;

    /** dataFormatString */
    dataFormatString?: string;

    /** fillBackgroundColor */
    fillBackgroundColor?: number;

    /** fillBackgroundColorColor */
    fillBackgroundColorColor?: defs.Color;

    /** fillForegroundColor */
    fillForegroundColor?: number;

    /** fillForegroundColorColor */
    fillForegroundColorColor?: defs.Color;

    /** fillPattern */
    fillPattern?:
      | 'NO_FILL'
      | 'SOLID_FOREGROUND'
      | 'FINE_DOTS'
      | 'ALT_BARS'
      | 'SPARSE_DOTS'
      | 'THICK_HORZ_BANDS'
      | 'THICK_VERT_BANDS'
      | 'THICK_BACKWARD_DIAG'
      | 'THICK_FORWARD_DIAG'
      | 'BIG_SPOTS'
      | 'BRICKS'
      | 'THIN_HORZ_BANDS'
      | 'THIN_VERT_BANDS'
      | 'THIN_BACKWARD_DIAG'
      | 'THIN_FORWARD_DIAG'
      | 'SQUARES'
      | 'DIAMONDS'
      | 'LESS_DOTS'
      | 'LEAST_DOTS';

    /** fillPatternEnum */
    fillPatternEnum?:
      | 'NO_FILL'
      | 'SOLID_FOREGROUND'
      | 'FINE_DOTS'
      | 'ALT_BARS'
      | 'SPARSE_DOTS'
      | 'THICK_HORZ_BANDS'
      | 'THICK_VERT_BANDS'
      | 'THICK_BACKWARD_DIAG'
      | 'THICK_FORWARD_DIAG'
      | 'BIG_SPOTS'
      | 'BRICKS'
      | 'THIN_HORZ_BANDS'
      | 'THIN_VERT_BANDS'
      | 'THIN_BACKWARD_DIAG'
      | 'THIN_FORWARD_DIAG'
      | 'SQUARES'
      | 'DIAMONDS'
      | 'LESS_DOTS'
      | 'LEAST_DOTS';

    /** font */
    font?: defs.Font;

    /** fontIndex */
    fontIndex?: number;

    /** hidden */
    hidden?: boolean;

    /** indention */
    indention?: number;

    /** index */
    index?: number;

    /** leftBorderColor */
    leftBorderColor?: number;

    /** locked */
    locked?: boolean;

    /** quotePrefixed */
    quotePrefixed?: boolean;

    /** rightBorderColor */
    rightBorderColor?: number;

    /** rotation */
    rotation?: number;

    /** shrinkToFit */
    shrinkToFit?: boolean;

    /** topBorderColor */
    topBorderColor?: number;

    /** verticalAlignment */
    verticalAlignment?: 'TOP' | 'CENTER' | 'BOTTOM' | 'JUSTIFY' | 'DISTRIBUTED';

    /** verticalAlignmentEnum */
    verticalAlignmentEnum?:
      | 'TOP'
      | 'CENTER'
      | 'BOTTOM'
      | 'JUSTIFY'
      | 'DISTRIBUTED';

    /** wrapText */
    wrapText?: boolean;
  }

  export class CjDataSourceSystemInfo {
    /** businessSystemId */
    businessSystemId?: string;

    /** businessSystemNameShortName */
    businessSystemNameShortName?: string;

    /** dataSourceSchema */
    dataSourceSchema?: string;

    /** lastModifyBy */
    lastModifyBy?: string;

    /** lastModifyDt */
    lastModifyDt?: string;
  }

  export class CjDataSourceTabInfo {
    /** businessSystemId */
    businessSystemId?: string;

    /** businessSystemNameShortName */
    businessSystemNameShortName?: string;

    /** dataFlagForCrtDwDll */
    dataFlagForCrtDwDll?: string;

    /** dataFlagForCrtDwHive */
    dataFlagForCrtDwHive?: string;

    /** dataFlagForCrtDwScript */
    dataFlagForCrtDwScript?: string;

    /** dataFlagForCrtOdsDll */
    dataFlagForCrtOdsDll?: string;

    /** dataFlagForCrtOdsHive */
    dataFlagForCrtOdsHive?: string;

    /** dataFlagForCrtOdsScript */
    dataFlagForCrtOdsScript?: string;

    /** dataFlagForGetCols */
    dataFlagForGetCols?: string;

    /** dataFlagForGetRows */
    dataFlagForGetRows?: string;

    /** dataSourceSchema */
    dataSourceSchema?: string;

    /** dataSourceTable */
    dataSourceTable?: string;

    /** dataSourceTableComment */
    dataSourceTableComment?: string;

    /** date */
    date?: string;

    /** dwCount */
    dwCount?: string;

    /** lastModifyBy */
    lastModifyBy?: string;

    /** lastModifyDt */
    lastModifyDt?: string;

    /** odsCount */
    odsCount?: string;

    /** tableCount */
    tableCount?: string;
  }

  export class Color {}

  export class EtuInfo {
    /** 源系统缩写 */
    businessSystemNameShortName: string;

    /** cellStyleMap */
    cellStyleMap?: ObjectMap<any, defs.CellStyle>;

    /** dataSourceSchema */
    dataSourceSchema: string;

    /** 源表名 */
    dataSourceTable: string;

    /** index */
    index?: string;

    /** metaStatus */
    metaStatus?: string;
  }

  export class ExclePropertyModel {
    /** businessSystemNameShortName */
    businessSystemNameShortName?: string;

    /** cellStyleMap */
    cellStyleMap?: ObjectMap<any, defs.CellStyle>;

    /** dataSourceSchema */
    dataSourceSchema?: string;

    /** date */
    date?: string;

    /** dwCount */
    dwCount?: string;

    /** odsCount */
    odsCount?: string;

    /** tableCount */
    tableCount?: string;
  }

  export class Font {
    /** bold */
    bold?: boolean;

    /** color */
    color?: number;

    /** fontHeight */
    fontHeight?: number;

    /** fontHeightInPoints */
    fontHeightInPoints?: number;

    /** fontName */
    fontName?: string;

    /** index */
    index?: number;

    /** italic */
    italic?: boolean;

    /** strikeout */
    strikeout?: boolean;

    /** typeOffset */
    typeOffset?: number;

    /** underline */
    underline?: string;
  }

  export class Page {
    /** pagenum */
    pagenum?: number;

    /** pagesize */
    pagesize?: number;

    /** query */
    query?: Array<string>;
  }

  export class PageGeorge<T0 = any> {
    /** 当前页数 */
    pagenum: number;

    /** 页面大小 */
    pagesize: number;

    /** 数据 */
    query: Array<string>;
  }

  export class Result {
    /** 返回状态码 */
    code?: number;

    /** 返回data */
    data?: object;

    /** 提示信息 */
    msg?: string;
  }

  export class ViewSourceSystemEntity {
    /** business_system_ID */
    business_system_ID?: string;

    /** business_system_name_short_name */
    business_system_name_short_name?: string;

    /** data_base_type */
    data_base_type?: string;

    /** status */
    status?: string;
  }
}

declare namespace API {
  /**
   * 定制化入湖
   */
  export namespace convertMetadata {
    /**
        * 获取容量
List<EtuInfo> 
        * /convertMetadata/getCapacity
        */
    export namespace getCapacity {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(
        params: Params,
        bodyParams: Array<defs.EtuInfo>,
      ): Promise<defs.Result>;
    }

    /**
        * 导入索引
List<EtuInfo> 
        * /convertMetadata/importIndex
        */
    export namespace importIndex {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(
        params: Params,
        bodyParams: Array<defs.EtuInfo>,
      ): Promise<defs.Result>;
    }

    /**
        * 导入元数据
List<EtuInfo> 复杂对象
        * /convertMetadata/importingMetadata
        */
    export namespace importingMetadata {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(
        params: Params,
        bodyParams: Array<defs.EtuInfo>,
      ): Promise<defs.Result>;
    }

    /**
     *  上传excel并转成map数据
     * /convertMetadata/uploadExcel
     */
    export namespace uploadExcel {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(
        params: Params,
        bodyParams: MultipartFile,
      ): Promise<defs.Result>;
    }
  }

  /**
   * Datalake Table Status Contrller
   */
  export namespace datalakeTableStatusContrller {
    /**
     * exportExcle
     * /tableStatus/exportExcle
     */
    export namespace exportExcle {
      export class Params {}

      export type Response = any;
      export const init: Response;
      export function request(
        params: Params,
        bodyParams: Array<defs.ExclePropertyModel>,
      ): Promise<any>;
    }

    /**
     * getStatusList
     * /tableStatus/getStatusList
     */
    export namespace getStatusList {
      export class Params {
        /** query */
        query?: Array<string>;
        /** pagenum */
        pagenum?: number;
        /** pagesize */
        pagesize?: number;
      }

      export type Response = defs.Result;
      export const init: Response;
      export function request(params: Params): Promise<defs.Result>;
    }

    /**
     * getSysList
     * /tableStatus/getSysList
     */
    export namespace getSysList {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(params: Params): Promise<defs.Result>;
    }
  }

  /**
   * DW模型设计
   */
  export namespace dwModelDesign {
    /**
     * dw在用区建表接口
     * /dwModelDesign/createDwUsingTable
     */
    export namespace createDWUsingTable {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(
        params: Params,
        bodyParams: string,
      ): Promise<defs.Result>;
    }

    /**
     * 按ODS表名查表
     * /dwModelDesign/getOdsTabInfoByName
     */
    export namespace getOdsTabInfoByName {
      export class Params {
        /** odsDataTable */
        odsDataTable: string;
      }

      export type Response = defs.Result;
      export const init: Response;
      export function request(params: Params): Promise<defs.Result>;
    }

    /**
     * 按备用区表名查表
     * /dwModelDesign/getTabByBakName
     */
    export namespace getTabByBakName {
      export class Params {
        /** dwDataTable */
        dwDataTable: string;
      }

      export type Response = defs.Result;
      export const init: Response;
      export function request(params: Params): Promise<defs.Result>;
    }

    /**
     * 按在用区表名查表
     * /dwModelDesign/getTabByUsingName
     */
    export namespace getTabByUsingName {
      export class Params {
        /** dwDataTable */
        dwDataTable: string;
      }

      export type Response = defs.Result;
      export const init: Response;
      export function request(params: Params): Promise<defs.Result>;
    }

    /**
     * dw在用区字段保存接口
     * /dwModelDesign/saveDWUsingCols
     */
    export namespace saveDWUsingCols {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(
        params: Params,
        bodyParams: string,
      ): Promise<defs.Result>;
    }

    /**
     * 保存映射关系
     * /dwModelDesign/saveMapRel
     */
    export namespace saveMapRel {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(
        params: Params,
        bodyParams: string,
      ): Promise<defs.Result>;
    }
  }

  /**
   * 入湖总览
   */
  export namespace enterHuOverview {
    /**
     * 根据表名获取表的详细信息
     * /enterHuOverview/getByTableInfo
     */
    export namespace selectByTable {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(
        params: Params,
        bodyParams: String,
      ): Promise<defs.Result>;
    }

    /**
     *  获取去重的Schema
     * /enterHuOverview/getSchema
     */
    export namespace getSchema {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(
        params: Params,
        bodyParams: String,
      ): Promise<defs.Result>;
    }

    /**
     * 获取表信息列表
     * /enterHuOverview/getSysNameAndSchemaAndTableName
     */
    export namespace getSysNameAndSchemaAndTableName {
      export class Params {
        /** 当前页数 */
        pagenum: number;
        /** 数据 */
        query: object;
        /** 页面大小 */
        pagesize: number;
      }

      export type Response = defs.Result;
      export const init: Response;
      export function request(
        params: Params,
        bodyParams: String,
      ): Promise<defs.Result>;
    }

    /**
     *  获取去重的SystemName
     * /enterHuOverview/getSystemName
     */
    export namespace getSystemName {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(params: Params): Promise<defs.Result>;
    }
  }

  /**
   * 初始化ODS/DW脚本导出
   */
  export namespace exportScript {
    /**
     * 导出dw脚本
     * /exportScript/exportDwScript
     */
    export namespace exportDwScript {
      export class Params {}

      export type Response = any;
      export const init: Response;
      export function request(params: Params, bodyParams: string): Promise<any>;
    }

    /**
     * 导出ODS脚本
     * /exportScript/exportOdsScript
     */
    export namespace exportOdsScript {
      export class Params {}

      export type Response = any;
      export const init: Response;
      export function request(params: Params, bodyParams: string): Promise<any>;
    }

    /**
     * 获取DW脚本导出清单
     * /exportScript/getDwTabList
     */
    export namespace getDwTabList {
      export class Params {
        /** schema */
        schema: string;
      }

      export type Response = defs.Result;
      export const init: Response;
      export function request(params: Params): Promise<defs.Result>;
    }

    /**
     * getFilterList
     * /exportScript/getFilterList
     */
    export namespace getFilterList {
      export class Params {
        /** flag */
        flag: string;
      }

      export type Response = defs.Result;
      export const init: Response;
      export function request(params: Params): Promise<defs.Result>;
    }

    /**
     * getFilterResults
     * /exportScript/getFilterResults
     */
    export namespace getFilterResults {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(params: Params): Promise<defs.Result>;
    }

    /**
     * getFilterResults
     * /exportScript/getFilterResults
     */
    export namespace headGetFilterResults {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(params: Params): Promise<defs.Result>;
    }

    /**
     * getFilterResults
     * /exportScript/getFilterResults
     */
    export namespace postGetFilterResults {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(params: Params): Promise<defs.Result>;
    }

    /**
     * getFilterResults
     * /exportScript/getFilterResults
     */
    export namespace putGetFilterResults {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(params: Params): Promise<defs.Result>;
    }

    /**
     * getFilterResults
     * /exportScript/getFilterResults
     */
    export namespace deleteGetFilterResults {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(params: Params): Promise<defs.Result>;
    }

    /**
     * getFilterResults
     * /exportScript/getFilterResults
     */
    export namespace optionsGetFilterResults {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(params: Params): Promise<defs.Result>;
    }

    /**
     * getFilterResults
     * /exportScript/getFilterResults
     */
    export namespace patchGetFilterResults {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(params: Params): Promise<defs.Result>;
    }

    /**
     * 获取ODS脚本导出清单
     * /exportScript/getOdsTabList
     */
    export namespace getOdsTabList {
      export class Params {
        /** schema */
        schema: string;
      }

      export type Response = defs.Result;
      export const init: Response;
      export function request(params: Params): Promise<defs.Result>;
    }
  }

  /**
   * ods/dw脚本生成页面
   */
  export namespace generateScript {
    /**
        * 创建ods加载脚本
List<EtuInfo>
        * /generateScript/createOdsLoad
        */
    export namespace createOdsLoad {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(
        params: Params,
        bodyParams: Array<defs.EtuInfo>,
      ): Promise<defs.Result>;
    }

    /**
     * 生成dw初始化脚本
     * /generateScript/generateDwInitScript
     */
    export namespace generateDwInitScript {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(
        params: Params,
        bodyParams: string,
      ): Promise<defs.Result>;
    }

    /**
     * 生成ods初始化脚本
     * /generateScript/generateSqoopScript
     */
    export namespace generateSqoopScript {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(
        params: Params,
        bodyParams: string,
      ): Promise<defs.Result>;
    }

    /**
     * dw脚本生成页面按系统名筛选接口
     * /generateScript/getDwListByFilter
     */
    export namespace getDwListByFilter {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(
        params: Params,
        bodyParams: defs.Page,
      ): Promise<defs.Result>;
    }

    /**
     * dw脚本生成页面获取筛选列表接口
     * /generateScript/getDwSystemFilterList
     */
    export namespace getDwSystemFilterList {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(params: Params): Promise<defs.Result>;
    }

    /**
     * 获取dw脚本生成页面表清单
     * /generateScript/getDwTabList
     */
    export namespace getDwTabList {
      export class Params {
        /** query */
        query?: Array<string>;
        /** pagenum */
        pagenum?: number;
        /** pagesize */
        pagesize?: number;
      }

      export type Response = defs.Result;
      export const init: Response;
      export function request(params: Params): Promise<defs.Result>;
    }

    /**
     * 获取ods脚本生成页面表清单接口
     * /generateScript/getODSTableInfo
     */
    export namespace getODSTableInfo {
      export class Params {
        /** query */
        query?: Array<string>;
        /** pagenum */
        pagenum?: number;
        /** pagesize */
        pagesize?: number;
      }

      export type Response = defs.Result;
      export const init: Response;
      export function request(params: Params): Promise<defs.Result>;
    }

    /**
     * ods脚本生成页面按系统名筛选接口
     * /generateScript/getOdsListByFilter
     */
    export namespace getOdsListByFilter {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(
        params: Params,
        bodyParams: defs.Page,
      ): Promise<defs.Result>;
    }

    /**
     * ods脚本生成页面获取筛选列表接口
     * /generateScript/getOdsSystemFilterList
     */
    export namespace getOdsSystemFilterList {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(params: Params): Promise<defs.Result>;
    }

    /**
        * 初始化ods加载脚本
List<EtuInfo>
        * /generateScript/initOdsLoad
        */
    export namespace initOdsLoad {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(
        params: Params,
        bodyParams: Array<defs.EtuInfo>,
      ): Promise<defs.Result>;
    }
  }

  /**
   * 初始化业务元数据
   */
  export namespace getSourceMetaData {
    /**
        * 生成schema数据信息
List<ViewSourceSystemEntity> 复杂对象
        * /getSourceMetaData/getConnection
        */
    export namespace setStauts {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(
        params: Params,
        bodyParams: Array<defs.ViewSourceSystemEntity>,
      ): Promise<defs.Result>;
    }

    /**
     * 获取配置的参数
     * /getSourceMetaData/getDataInfo
     */
    export namespace getDataSourceInfo {
      export class Params {
        /** 当前页数 */
        pagenum: number;
        /** 数据 */
        query: object;
        /** 页面大小 */
        pagesize: number;
      }

      export type Response = defs.Result;
      export const init: Response;
      export function request(params: Params): Promise<defs.Result>;
    }

    /**
     * 获取 schema信息表
     * /getSourceMetaData/getSchema
     */
    export namespace getSchema {
      export class Params {
        /** 当前页数 */
        pagenum: number;
        /** 数据 */
        query: object;
        /** 页面大小 */
        pagesize: number;
      }

      export type Response = defs.Result;
      export const init: Response;
      export function request(params: Params): Promise<defs.Result>;
    }

    /**
     * 获取表及字段的查询
     * /getSourceMetaData/getSchemaByFilter
     */
    export namespace getDataInfoByFilter {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(
        params: Params,
        bodyParams: defs.PageGeorge<Array<string>>,
      ): Promise<defs.Result>;
    }

    /**
     * 获取源系统数据模式
     * /getSourceMetaData/getSystemFilterList
     */
    export namespace getSystemFilterList {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(params: Params): Promise<defs.Result>;
    }

    /**
        * 按schema导入元数据
List<CjDataSourceSystemInfo> 复杂对象
        * /getSourceMetaData/importingMetadata
        */
    export namespace importingMetadata {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(
        params: Params,
        bodyParams: Array<defs.CjDataSourceSystemInfo>,
      ): Promise<defs.Result>;
    }
  }

  /**
   * hive建表
   */
  export namespace hiveCreateTable {
    /**
     * ods建表接口
     * /hiveCreateTable/createODSTable
     */
    export namespace createODSTable {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(
        params: Params,
        bodyParams: string,
      ): Promise<defs.Result>;
    }

    /**
     * dw备用区建表接口
     * /hiveCreateTable/dWCreateTable
     */
    export namespace dWCreateTable {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(
        params: Params,
        bodyParams: string,
      ): Promise<defs.Result>;
    }

    /**
     * dw建表页面获取表清单接口
     * /hiveCreateTable/getDWCreateTabList
     */
    export namespace getDWCreateTabList {
      export class Params {
        /** query */
        query?: Array<string>;
        /** pagenum */
        pagenum?: number;
        /** pagesize */
        pagesize?: number;
      }

      export type Response = defs.Result;
      export const init: Response;
      export function request(params: Params): Promise<defs.Result>;
    }

    /**
     * dw建表页面按系统名和schema筛选接口
     * /hiveCreateTable/getDWCreateTabListByFilter
     */
    export namespace getDWCreateTabListByFilter {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(
        params: Params,
        bodyParams: defs.PageGeorge<Array<string>>,
      ): Promise<defs.Result>;
    }

    /**
     * 获取dw建表页面的筛选列表
     * /hiveCreateTable/getDWSystemAndSchemaFilterList
     */
    export namespace getDWSystemAndSchemaFilterList {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(params: Params): Promise<defs.Result>;
    }

    /**
     * ODS建表页面按系统名和schema筛选接口
     * /hiveCreateTable/getODSCreateTabListByFilter
     */
    export namespace getODSCreateTabListByFilter {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(
        params: Params,
        bodyParams: defs.Page,
      ): Promise<defs.Result>;
    }

    /**
     * 判断ODS抽取策略和分区字段
     * /hiveCreateTable/getODSLoadMode
     */
    export namespace getODSLoadMode {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(
        params: Params,
        bodyParams: Array<defs.CjDataSourceTabInfo>,
      ): Promise<defs.Result>;
    }

    /**
     * 获取ods建表页面的筛选列表
     * /hiveCreateTable/getODSSystemAndSchemaFilterList
     */
    export namespace getODSSystemAndSchemaFilterList {
      export class Params {}

      export type Response = defs.Result;
      export const init: Response;
      export function request(params: Params): Promise<defs.Result>;
    }

    /**
     * ods建表页面获取表清单接口
     * /hiveCreateTable/getODSTableInfo
     */
    export namespace getODSTable {
      export class Params {
        /** 当前页数 */
        pagenum: number;
        /** 数据 */
        query: object;
        /** 页面大小 */
        pagesize: number;
      }

      export type Response = defs.Result;
      export const init: Response;
      export function request(params: Params): Promise<defs.Result>;
    }
  }

  /**
   * Kafka Test Controller
   */
  export namespace kafkaTest {
    /**
     * getDWSystemAndSchemaFilterList
     * /kafka/sender
     */
    export namespace getDWSystemAndSchemaFilterList {
      export class Params {}

      export type Response = any;
      export const init: Response;
      export function request(params: Params): Promise<any>;
    }
  }
}
