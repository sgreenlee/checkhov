$(function () {

  var $loginModal = $("#login-modal");
  var $signupModal = $("#signup-modal");
  var $modalOverlay = $("#modal-overlay");
  var $signupForm = $("#signup-form");
  var $loginForm = $("#login-form");

  var modalOff = function () {
    $('.modal-group').css({display: "none"});
  };

  $('#header-login').on('click', function (e) {
    $modalOverlay.css({ display: "block" });
    $loginModal.css({ display: "block" });
  });

  $('#header-signup').on('click', function (e) {
    $modalOverlay.css({ display: "block" });
    $signupModal.css({ display: "block" });
  });

  $('.modal-close').on('click', function (e) {
    modalOff();
  });

  var notifyErrors = function (errors, $form) {
    var $errorContainer = $form.find(".error-messages");
    $errorContainer.empty();
    errors.forEach( function (error) {
      var $err = $("<li>").text(error);
      $errorContainer.append($err);
    });
  };

  $loginForm.on("submit", function (e) {
    e.preventDefault();
    var $form = $(this);

    $.ajax({
      type: "POST",
      url: "/api/session",
      data: $form.serialize(),
      success: function (data) {
        // Redirect to App on success!
        window.location.href = "/";
      },
      error: function (data) {
        var errors = data.responseJSON.errors;
        if (errors) {
          notifyErrors(errors, $form);
        }
      }
    });
  });

  $signupForm.on("submit", function (e) {
    e.preventDefault();
    var $form = $(this);

    $.ajax({
      type: "POST",
      url: "/api/users",
      data: $form.serialize(),
      success: function (data) {
        // Redirect to App on success!
        window.location.href = "/";
      },
      error: function (data) {
        var errors = data.responseJSON.errors;
        if (errors) {
          notifyErrors(errors, $form);
        }
      }
    });
  });

});
