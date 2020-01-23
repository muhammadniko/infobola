const url = 'https://api.football-data.org/v2/competitions/'
const token = 'ede2317003c1489987349f7eac326ec8'
const options = {
  method: 'get',
  headers: {
    'X-Auth-Token': token
  }
}

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getTeams(team_id) {

  let api = url + team_id + '/standings'
  
  fetch(api, options)
    .then(status)
    .then(json)
    .then(function(data) {

    console.log(data)

    let klasemenHTML = "";
    let checked = '';
    
    data.standings[0].table.forEach(function(item) {
      klasemenHTML += `
        <div class="card-panel grey lighten-5 z-depth-1">
          <div class="row valign-wrapper">
            <div class="col s4">
              <img src="${item.team.crestUrl}" alt="" class="circle responsive-img"> <!-- notice the "circle" class -->
            </div>
            <div class="col s10">
              <span class="black-text">
                <h5>${item.team.name}</h5>
                Played Games : ${item.playedGames}</br>
                Win : ${item.won}</br>
                Draw : ${item.draw}</br>
                Lost : ${item.lost}</br>
              </span>
              <a href="#" data-id="${item.team.id}" data-url="${item.team.crestUrl.replace(/^http:\/\//i, 'https://')}" data-name="${item.team.name}" class="starred">Add to Favorite</a>
            </div>
          </div>
        </div>
      `;
    });
    
    document.getElementById("timKlasemen").innerHTML = klasemenHTML;

    $('.starred').each(function() {
  
      let btnfav = $(this)
      let id = btnfav.data('id')
      let name = btnfav.data('name')
      let path_img = btnfav.data('url')

      let data = {
        id,
        name,
        path_img
      }

      btnfav.click(function(e) {
        e.preventDefault()
        saveToFavorit(id, data)

        M.toast({ html: "Telah Ditambahkan", classes: 'rounded', displayLength: 1000 });
      })
    })
  })
  .catch(error);
}

function showTimFavorit() {
  getTimFavorit().then(function(favorit) {
    
    console.log(favorit);
    var favHTML = "";
    
    favorit.forEach(function(favorit) {
      favHTML += `
        <div class="card-panel grey lighten-5 z-depth-1" id="team-${favorit.team_id}">
          <div class="row valign-wrapper">
            <div class="col s4">
              <img src="${favorit.team_path_icon}" alt="" class="circle responsive-img"> <!-- notice the "circle" class -->
            </div>
            <div class="col s10">
              <span class="black-text">
                <h5>${favorit.team_name}</h5>
                <a href="#" data-id="${favorit.team_id}" class="unfavorit">Remove From Favorite</a>
              </span>
            </div>
          </div>
        </div>
      `;
    });

    document.getElementById("body-content").innerHTML = favHTML;
    
    $('.unfavorit').each(function() {
      let btnunfav = $(this)
      let id = btnunfav.data('id')

      btnunfav.click(function(e) {
        e.preventDefault()
        removeFavorit(id)

        let card = $("#team-" + id)  
        card.hide("slow")

        M.toast({ html: "Telah Dihapus dari Favorit", classes: 'rounded', displayLength: 1000 });
      })
    })
  });
}

