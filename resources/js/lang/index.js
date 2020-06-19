import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import en from 'view-design/dist/locale/zh-CN';
import zh from 'view-design/dist/locale/en-US';
import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n);

const messages = {
  en: {
    ...enLocale,
    ...en
  },
  zh: {
    ...zhLocale,
    ...zh
  }
};

const i18n = new VueI18n({
  locale: Cookies.get('language') || 'en', // set locale
  messages // set locale messages
});

export default i18n
