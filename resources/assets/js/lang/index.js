import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import iviewZhLocale from 'iview/src/locale/lang/zh-CN';
import iviewEnLocale from 'iview/src/locale/lang/en-US';
import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n);

const messages = {
  en: {
    ...enLocale,
    ...iviewEnLocale
  },
  zh: {
    ...zhLocale,
    ...iviewZhLocale
  }
};

const i18n = new VueI18n({
  locale: Cookies.get('language') || 'en', // set locale
  messages // set locale messages
});

export default i18n
