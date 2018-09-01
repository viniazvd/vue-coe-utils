// imports..

// https://repl.it/@viniazvd/isValid
const isValid = value => {
  if (Array.isArray(value)) return !!value.length
  if (typeof value === 'object') return !!Object.keys(value).length
  if (typeof value === 'string') return !!value.length
  if (typeof value === 'number') return !!value
  return !!value
}

// https://repl.it/@viniazvd/getAbsolutValue
const getAbsolutValue = n => ((n*n) **0.5)

const isMobile = () => {
  return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp2|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
}

// trick to remove object references
const clone = data => JSON.parse(JSON.stringify(data))

// https://repl.it/@viniazvd/containsWord
const containsWord = (word = '', words = '') => !!(words.toLowerCase().split(word.toLowerCase()).length - 1)

// https://repl.it/@viniazvd/removeDuplicates
const removeDuplicates = (arr, prop) => {
  const digest = arr.reduce((acc, el) => {
    if (!acc.has(el[prop])) acc.set(el[prop], el)

    return acc
  }, new Map())

  return [...digest.values()]
}

// https://repl.it/@viniazvd/paginate
const pagination = (array = [], paginate = {}) => {
  let { current_page = 0, from = 0, per_page = 10, to = 0, total } = paginate

  const data = array.slice((current_page - 1) * per_page, per_page * current_page)
  from = ((current_page - 1) * per_page) + 1
  to = ((current_page - 1) * per_page) + data.length
  total = array.length

  return {
    data,
    current_page,
    from,
    per_page: 10,
    to,
    total
  }
}

// https://repl.it/@viniazvd/compare-objects (ft. -@woods)
const equals = (obj1, obj2) => {
  if (!isValid(obj1) || !isValid(obj2)) return false

  const isObject = (data) => typeof (data) === 'object'
  const hasOwnProperty = (obj1, obj2, key) => obj1.hasOwnProperty(key) === obj2.hasOwnProperty(key)

  return Object.keys(obj1).every(key => {
    if (!hasOwnProperty(obj1, obj2, key)) return false

    return isObject(obj1[key])
      ? equals(obj1[key], obj2[key])
      : obj1[key] === obj2[key]
  })
}

// https://repl.it/@viniazvd/translateEntity (ft. -@lubien)
const translateEntity = (labels, entity) => {
  return labels
    .map(([propName, mappedName]) => ({
      name: mappedName,
      value: entity[propName]
    }))
}

// https://repl.it/@viniazvd/isFormValid (ft. -@lubien)
const isFormValid = (requireds = [], form = {}) => {
  const isValid = prop => form[prop]
  
  return requireds.every(isValid)
}

// https://repl.it/@viniazvd/final-formValidator (ft. -@lubien)
const formValidator = (requireds, obj, x = new Set(requireds)) =>
  Object
    .entries(obj)
    .reduce((acc, [key, value]) => {
      acc[key] = !!(x.has(key) && value)
      return acc
    }, {})

// https://repl.it/@viniazvd/formRequireds
const formRequireds = (obj = {}, requireds = []) => 
  Object
    .entries(obj)
    .reduce((acc, [key]) => {
      const required = requireds.includes(key)
      if (required) acc[key] = false

      return acc
    }, {})

// https://repl.it/@viniazvd/objFilter
const objFilter = (data = {}, keys = []) => JSON.parse(JSON.stringify(data, keys))

// https://repl.it/@viniazvd/findBy
const findBy = (
  list = [], 
  strings = '', 
  keys = [], 
  terms = strings.toLowerCase().split(' ')) => {
    return list.filter(el => terms.some(v => keys.some(k => el[ k ].toLowerCase().includes(v))))
}

// https://repl.it/@viniazvd/regexValidation
const regexValidation = (type, value) => {
  const fields = { 
    email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    phone: /^\([1-9]{2}\) [2-9][0-9]{3,4}\-[0-9]{4}$/,
    birthday: /^[0-9]{4}[\-][0-9]{2}[\-][0-9]{2}$/,
    gender: /^(masculino|feminino|outro)$/
  }

  return fields[type].test(value)
}

// https://repl.it/@viniazvd/intersect
const intersect = (array1, array2, param) => {
  const setObj = new Set(array1.map(array1 => array1[param]))  
  
  return array2.filter(array2 => !setObj.has(array2[param]))
}

const functions = {
  isValid,
  getAbsolutValue,
  isMobile,
  clone,
  containsWord,
  removeDuplicates,
  pagination,
  equals,
  translateEntity,
  isFormValid,
  formValidator,
  formRequireds,
  objFilter,
  findBy,
  regexValidation,
  intersect
}

export default Vue => {
  Object.defineProperty(Vue.prototype, '$f', {
    get () {
      return functions
    }
  })
}