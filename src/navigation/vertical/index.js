// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import {
  HomeOutline, CubeOutline, ChartBoxOutline,
  Account, FormatLetterCase, BookOutline,
  CreditCardOutline, TagOutline, AlertCircleOutline,
  GoogleCirclesExtended
} from "mdi-material-ui";

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Autores',
      icon: Account,
      path: '/authors'
    },
    {
      title: 'Assuntos',
      icon: TagOutline,
      path: '/subjects'
    },
    {
      title: 'Livros',
      icon: BookOutline,
      path: '/books'
    },
    {
      title: 'Relatório',
      icon: ChartBoxOutline,
      path: '/reports'
    },
    // {
    //   title: 'Login',
    //   icon: Login,
    //   path: '/pages/login',
    //   openInNewTab: true
    // }
  ]
}

export default navigation
