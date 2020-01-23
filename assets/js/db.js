// Buat Database Baru
var dbPromised = idb.open("infobola", 1, function(upgradeDb) {
  var favoritObjectStore = upgradeDb.createObjectStore("favorit", {
    keyPath: "team_id"
  });

  favoritObjectStore.createIndex("team_id", "id_team");
  favoritObjectStore.createIndex("team_name", "team_name");
});



// Tambahke Favorit
function saveToFavorit(id, data) {
  dbPromised.then(function(db) {
    
    var tx = db.transaction("favorit", "readwrite");
    var store = tx.objectStore("favorit");

    let team = {
      team_id: id,
      team_name: data.name,
      team_path_icon: data.path_img
    }

    store.put(team);
    return tx.complete;
  })
  .then(function() {
    console.log("Telah ditambah ke favorit");
  });
}

// Hapus Favorit
function removeFavorit(id) {
  dbPromised.then(function(db) {
    var tx = db.transaction("favorit", "readwrite");
    var store = tx.objectStore("favorit");

    store.delete(id);
 
    return tx.complete;
  })
  .then(function() {
    console.log("Telah dihapus dari favorit");
  });
}

// Ambil Tim Favorit
function getTimFavorit() {
  return new Promise(function(resolve, reject) {
    dbPromised.then(function(db) {
      var tx = db.transaction("favorit", "readonly");
      var store = tx.objectStore("favorit");
 
      return store.getAll();
    })
    .then(function(favorit) {
      resolve(favorit);
    });
  });
}