let global = {
  TARGETS: '',
  ENTRYINFORS: '',
  CLEARANCE: '',
  BSTATIS: ''
}

if (process.env.NODE_ENV === 'production') {
  global.TARGETS = '/api/hexp-hp-service'
  global.ENTRYINFORS = '/api/hexp-entry-query-service'
  global.CLEARANCE = '/api/hexp-clearance-service'
  global.BSTATIS = '/api/hexp-b-statis-service'
} else {
  global.TARGETS = '/api/hexp-hp-service'
  global.ENTRYINFORS = '/server1'
  global.CLEARANCE = '/api/hexp-clearance-service'
  global.BSTATIS = '/api/hexp-b-statis-service'
}
export default global
