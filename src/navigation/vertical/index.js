
import {
  HomeOutline, ChartBoxOutline,
  Account, BookOutline,
  TagOutline} from "mdi-material-ui";

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
