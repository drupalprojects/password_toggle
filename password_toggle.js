(function ($) {

  /**
   * Add a "Show password" checkbox to each password field.
   */
  Drupal.behaviors.showPassword = {
    attach: function (context) {
      // Create the checkbox.
      var showPassword = $('<label class="password-toggle"><input type="checkbox" />' + Drupal.t('Show password') + '</label>');
      // Add click handler to checkboxes.
      $(':checkbox', showPassword).click(function () {
        $password_field = $(this).closest('.form-type-password').find(':password');
        if ($password_field.length === 0) {
          return;
        }
        $preview = $(this).closest('.form-type-password').find('.password-preview');
        if ($preview.length === 0) {
          $preview = $('<div>')
                  .addClass('password-preview')
                  .insertAfter($password_field);
        }
        if ($(this).is(':checked')) {
          // Fill and show the password preview.
          $preview.text($password_field.val());
          $preview.slideDown();
        }
        else {
          // Hide password preview.
          $preview.slideUp();
          $preview.text('');
        }
      });

      // Update password preview.
      var updatePasswordPreview = function () {
        $preview = $(this).closest('.form-type-password').find('.password-preview');
        if ($preview.is(':visible')) {
          $preview.text($(this).val());
        }
      }

      var $passwordInput = $(context).find(':password');
      $passwordInput.bind('keyup', updatePasswordPreview);

      // Add checkbox to all password field on the current page.
      showPassword.insertAfter($passwordInput);
    }
  };

})(jQuery);
