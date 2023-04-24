import * as moment from 'moment';
import * as _ from 'lodash';
import 'moment/locale/es';

const formatter = {
  date(date: Date, formatString = 'D MMMM YYYY') {
    if (!date) return '';

    moment.locale('en');
    return moment(date).format(formatString);
  },
  currency(number = 0) {
    const formattedNumber = `$${number.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`;
    const arrayNumber = formattedNumber.split('.');
    return arrayNumber[1] === '00' ? `${arrayNumber[0]}.00` : formattedNumber;
  },
  thousandSeparator(number = 0) {
    const formattedNumber = `${number.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`;
    const arrayNumber = formattedNumber.split('.');
    return arrayNumber[1] === '00' ? arrayNumber[0] : formattedNumber;
  },
  capitalize(text = '') {
    if (!text) return '';

    if (text && !text.length) {
      return text;
    }

    if (text.length === 1) {
      return text.toUpperCase();
    }

    const firstLetter = text.substring(0, 1);
    const remainingText = text.substring(1);
    return `${firstLetter.toUpperCase()}${remainingText.toLowerCase()}`;
  },
  clean(object: any) {
    const result: any = {};
    const objectAttributes = Object.keys(object);

    objectAttributes.forEach((attribute: any) => {
      const attributeValue = object[attribute];

      if (_.isPlainObject(attributeValue)) {
        result[attribute] = formatter.clean(attributeValue);
      } else if (!_.isFunction(attributeValue)) {
        result[attribute] = attributeValue;
      }
    });

    return result;
  },
  applyMask(mask = '', number = '') {
    const maskArray = mask.split('');
    const numericValueArray = number.toString().split('');
    let maskedValue = '';
    let nextIndex = 0;

    maskArray.forEach((character) => {
      if (character === 'x') {
        maskedValue += numericValueArray[nextIndex];
        nextIndex += 1;
      } else {
        maskedValue += character;
      }
    });

    return maskedValue;
  },
  subString(text = '', maxLength = 50) {
    let shortString = text;

    if (shortString.length > maxLength) {
      shortString = `${shortString.substring(0, maxLength)}...`;
    }

    return shortString;
  },
  slugify(rawText: string) {
    let str = rawText;
    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaaaeeeeiiiioooouuuunc------";

    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-") // collapse dashes
      .replace(/^-+/, "") // trim - from start of text
      .replace(/-+$/, ""); // trim - from end of text

    return str;
  },
  monthOfYear: (index = 0) => {
    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ];

    return months[index]
  },
  toQueryParams: (path: any) => {
    let query = '';

    if (!_.isEmpty(Object.keys(path))) {
      Object.keys(path)
        .forEach((key: any) => {
          query += `${key}=${path[key]}&`;
        });

      query = `?${query.slice(0, -1)}`;
    }

    return query;
  },
  readPathQueryParams(path: any) {
    if (!path.length) return {};
    const query = path.substring(1);
    const params = query.split('&');

    const paramsData: any = {};
    params.forEach((qr: string) => {
      const data = qr.split('=');
      paramsData[data[0]] = data[1];
    });

    return paramsData;
  },
  isAdultDate() {
    const now = new Date();
    now.setFullYear(now.getFullYear() - 18)
    return now;
  },
};


export default formatter;
