import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('@/components/home')
const dataImport = () => import('@/components/dataImport/dataImport')
const GetSourceSystemSchema = () => import('@/components/initData/getSourceSystemSchema')
const GetTabColInfo = () => import('@/components/initData/getTabColInfo')
const CreateODSTable = () => import('@/components/createTable/createODSTable')
const CreateDWTable = () => import('@/components/createTable/createDWTable')
const GenerateODSScript = () => import('@/components/sql/generateODSScript')
const GenerateDWScript = () => import('@/components/sql/generateDWScript')
const Derive = () => import('@/components/derive/Derive')
const DwModelDesign = () => import('@/components/dwModelDesign/dwModelDesign')
const Overview = () => import('@/components/overview/Overview')
const Presentation = () => import('@/components/presentation/Presentation')
const CustomizationGetTabColInfo = () => import('@/components/customizationInitData/getTabColInfo')
const CustomizationOds = () => import('@/components/customizationOds/customizationOds')
const CustomizationDw = () => import('@/components/customizationDw/customizationDw')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/dataImport',
      children: [
        { path: '/dataImport', name: 'dataImport', component: dataImport },
        { path: '/getSourceSystemSchema', name: 'getSourceSystemSchema', component: GetSourceSystemSchema },
        { path: '/getTabColInfo', name: 'getTabColInfo', component: GetTabColInfo },
        { path: '/createODSTable', name: 'createODSTable', component: CreateODSTable },
        { path: '/createDWTable', name: 'createDWTable', component: CreateDWTable },
        { path: '/generateODSScript', name: 'generateODSScript', component: GenerateODSScript },
        { path: '/generateDWScript', name: 'generateDWScript', component: GenerateDWScript },
        { path: '/derive', name: 'derive', component: Derive },
        { path: '/overview', name: 'overview', component: Overview },
        { path: '/presentation', name: 'presentation', component: Presentation },
        { path: '/customizationGetTabColInfo', name: 'customizationGetTabColInfo', component: CustomizationGetTabColInfo },
        { path: '/customizationOds', name: 'customizationOds', component: CustomizationOds },
        { path: '/customizationDw', name: 'customizationDw', component: CustomizationDw },
        { path: '/dwModelDesign', name: 'dwModelDesign', component: DwModelDesign }
      ]
    }
  ]
})
