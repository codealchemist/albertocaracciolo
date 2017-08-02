let sound
let currentSongId
let playing = false
const seekSeconds = 10
const songs = [
  'audio/01. Los Mareados.mp3',
  'audio/02. Tema de Tango en Re Menor.mp3',
  'audio/03. Templo 59.mp3',
  'audio/04. Gallo Ciego.mp3',
  'audio/05. Desvelo.mp3',
  'audio/06. Tierrita.mp3',
  'audio/07. El Motivo.mp3',
  'audio/08. Chiqui.mp3',
  'audio/09. Desde el Alma.mp3',
  'audio/10. Por la Vuelta.mp3',
  'audio/11. Fuimos.mp3',
  'audio/12. La Ultima Curda.mp3'
]
const lastSongId = songs.length

function showLyric (name) {
  $(`#lyric-more-${name}`).show()
  $(`#lyric-less-button-${name}`).show()
  $(`#lyric-more-button-${name}`).hide()
}

function hideLyric (name) {
  $(`#lyric-more-${name}`).hide()
  $(`#lyric-less-button-${name}`).hide()
  $(`#lyric-more-button-${name}`).show()
}

function play(id, el) {
  $('.playing').removeClass('playing') // Remove playing status.
  if (sound) sound.unload()

  // Stop current.
  if (playing && currentSongId === id) {
    playing = false
    setPlayingStatus(el, playing)
    return
  }

  playing = true
  showPlayer()
  $(el).addClass('playing')
  currentSongId = id
  setPlayingStatus(el, playing)
  const src = songs[id]
  sound = new Howl({src, html5: true})
  sound.play()
  setPlayerEvents()
}

function setPlayerEvents () {
  sound.on('end', () => playNext())
}

function playNext() {
  let nextId = currentSongId + 1
  if (nextId === lastSongId) nextId = 0
  playStop(nextId)
}

function showPlayer () {
  $('#player').addClass('visible')
}

function hidePlayer () {
  $('#player').removeClass('visible')
}

function setPlayingStatus (el, playing) {
  let songName = ''
  if (playing) {
    songName = $(el).html()
  }

  $('#current-song-name').html(songName)
  togglePlayButton(playing)
}

function togglePlayButton (playing) {
  if (playing) {
    $('#player-button')
      .addClass('btn-stop')
      .removeClass('btn-play')
    return
  }

  $('#player-button')
    .addClass('btn-play')
    .removeClass('btn-stop')
}

function playStop (songId = currentSongId) {
  const id = songId || 0
  const el = $('.songs li')[id]
  play(id, el)
}

function onKey (code) {
  // Rewind.
  if (code === 37) {
    const pos = sound.seek() - seekSeconds
    sound.seek(pos)
  }

  // Fast forward.
  if (code === 39) {
    const pos = sound.seek() + seekSeconds
    sound.seek(pos)
  }
}
