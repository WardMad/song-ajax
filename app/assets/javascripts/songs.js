function toggleDone() {
  $(this).parent().parent().toggleClass("success");
  updateCounters();
}

function updateCounters() {
  $("#total-count").html($(".song").size());
  $("#created-count").html($(".success").size());
  $("#song-count").html($(".song").size() - $(".success").size());
}


function createSong(name) {
  var newSong = { name: name, created: false };

  $.ajax({
    type: "POST",
    url: "/songs.json",
    data: JSON.stringify({
      song: newSong
    }),
    contentType: "application/json",
    dataType: "json"
  })
  .done(function(data) {
    console.log(data);

    var checkboxId = data.id;

    var label = $('<label></label>')
      .attr('for', checkboxId)
      .html(name);

    var checkbox = $('<input type="checkbox" value="1" />')
      .attr('id', checkboxId)
      .bind('change', toggleDone);

    var tableRow = $('<tr class="song"></td>')
      .attr('data-id', checkboxId)
      .append($('<td>').append(checkbox))
      .append($('<td>').append(label));

    $("#songList").append(tableRow);

    updateCounters();
  })

  .fail(function(error) {
    console.log(error)
    error_message = error.responseJSON.name[0];
    showError(error_message);
  });
}

    function showError(message) {
      var errorHelpBlock = $('<span class="help-block"></span>')
        .attr('id', 'error_message')
        .text(message);

      $("#formgroup-name")
        .addClass("has-error")
        .append(errorHelpBlock);
    }

    function resetErrors() {
      $("#error_message").remove();
      $("#formgroup-name").removeClass("has-error");
    }



function submitSong(event) {
  event.preventDefault();
  resetErrors();
  createSong($("#song_name").val());
  $("#song_name").val(null);
  updateCounters();
}

function cleanUpDoneSongs(event) {
  event.preventDefault();
  $.when($(".success").remove())
    .then(updateCounters);
}

$(document).ready(function() {
  $("input[type=checkbox]").bind('change', toggleDone);
  $("form").bind('submit', submitSong);
  $("#clean-up").bind('click', cleanUpDoneSongs);
  updateCounters();
});
