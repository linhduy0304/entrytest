

const Realm = require('realm');

const User = {
  name: 'User',
  primaryKey: 'id',
  properties: {
    id: 'int',
    username:  'string',
    fullname: 'string',
    email: 'string',
    pass: 'string',
  }
};

const Status = {
  name: 'Status',
  properties: {
    sort: 'string',
    filter: 'string',
    id_user: 'int'
  }
}

const config = {
  schema: [User, Status]
}

// getStatus
export const getStatus = (id_user) => new Promise((resolve, reject) => {
  Realm.open(config).then(realm => {
    let newData = realm.objects('Status').filtered(`id_user = "${id_user}"`);
    resolve(newData);
  })
  .catch(error => {
    reject(error)
  }
  )
})
//saveStatus
export const saveStatus = (data) => new Promise((resolve, reject) => {
  Realm.open(config).then(realm => {
    realm.write(() => {
      let result = realm.objects('Status').filtered(`id_user = "${data.id_user}"`);
      if(result.length === 0) {
        realm.create('Status', data);
        resolve(data)
      }else {
        result[0].sort = data.sort;
        result[0].filter = data.filter;
        resolve(result);
      }
     
    })
  }).catch(error => {
    reject(error)
  })
})

// getAcount
export const getAcount = (username, pass) => new Promise((resolve, reject) => {
  Realm.open(config).then(realm => {
    let newData = realm.objects('User').filtered(`username = "${username}" and pass = "${pass}"`,);
    resolve(newData);
  })
  .catch(error => {
    reject(error)
  }
  )
})

// getUsername
export const getUsername = username => new Promise((resolve, reject) => {
  Realm.open(config).then(realm => {
    let newData = realm.objects('User').filtered(`username = "${username}" `,);
    resolve(newData);
  })
  .catch(error => {
    reject(error)
  }
  )
})


export const insert = data => new Promise((resolve, reject) => {
  Realm.open(config).then(realm => {
    realm.write(() => {
      realm.create('User', data);
      
      resolve(data)
    })
  }).catch(error => {
    reject(error)
  })
  
})

//show all
export const showAll = (sort, input, page) => new Promise((resolve, reject) => {
  Realm.open(config).then(realm => {
    let all = realm.objects('User').sorted(sort, false).filtered(`username  CONTAINS[c] "${input}" || fullname  CONTAINS[c] "${input}"`,);
    let result = all.slice(page, page+5)
    resolve(result);
  })
  .catch(error => {
    reject(error)
  }
  )
})

export const filter = (input) => new Promise((resolve, reject) => {
  Realm.open(config).then(realm => {
    let newData = realm.objects('User').filtered(`username  CONTAINS[c] "${input}" || fullname  CONTAINS[c] "${input}"`,);
    resolve(newData);
  })
  .catch(error => {
    reject(error)
  }
  )
})


export default new Realm(config);

