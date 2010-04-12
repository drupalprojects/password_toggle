// $Id$
/**
 * Add a "Show password" checkbox to each password field.
 */
Drupal.behaviors.showPassword = function (context) {
  // Create the checkbox.
  var showPassword = $('<label><input type="checkbox" />' + Drupal.t('Show password') + '</label>');
  // Add click handler.
  $(':checkbox', showPassword).click(function () {
    var orig;
    var copy;
    if ($(this).is(':checked')) {
      // Copy original field and convert it to a simple textfield.
      orig = $(this).parent().parent().find(':password');
      copy = orig.clone();
      $(copy).attr('type', 'text');
      $(copy).addClass('show-password');
    }
    else {
      // Copy original field and convert it to a password field.
      orig = $(this).parent().parent().find('input.show-password');
      $(orig).removeClass('show-password');
      copy = orig.clone();
      $(copy).attr('type', 'password');
    }
    // Replace currently displayed field with the modified copy.
    $(orig).replaceWith(copy);
  });
  // Add checkbox to all password field on the current page.
  showPassword.insertAfter($(':password'));
};
