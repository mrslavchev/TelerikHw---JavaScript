// Generated by CoffeeScript 1.7.1
(function () {
  var $errorMessage, $successMessage, addStudent, reloadStudents, resourceUrl;

  resourceUrl = 'http://localhost:3000/students';

  $successMessage = $('.messages .success');

  $errorMessage = $('.messages .error');

  addStudent = function (data) {
    return $.ajax({
      url: resourceUrl,
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function (data) {
        $successMessage
          .html('' + data.name + ' successfully added')
          .show()
          .fadeOut(2000);
        reloadStudents();
      },
      error: function (err) {
        $errorMessage
          .html('Error happened: ' + err)
          .show()
          .fadeOut(2000);
      }
    });
  };

  reloadStudents = function () {
    $.ajax({
      url: resourceUrl,
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        var student, $studentsList, i, len;
        $studentsList = $('<ul/>').addClass('students-list');
        for (i = 0, len = data.students.length; i < len; i++) {
          student = data.students[i];
          $('<li />')
            .addClass('student-item')
            .append($('<strong /> ')
              .html(student.name))
            .append($('<span />')
              .html(student.grade))
            .appendTo($studentsList);
        }
        $('#students-container').html($studentsList);
      },
      error: function () {
        $errorMessage
          .html("Error happened: " + err)
          .show()
          .fadeOut(2000);
      }
    });
  };
  /*
    The task assignment here is a bit shady on how to use the API and 
    there's couple of unanswered quesions like why isn't DELETE query working
    or how to find out the ID since it is not puclically accessible on the server, 
    so my solution is basically to extend the ajax demo, with a single delete method.
    It's basically a work around, the delete is based on the value of the input field.
    If you use a newly started server the student Id will be corresponding to it's number in the list.
    If you clear the list once, and start adding again - it gets messy.
  */
  deleteStudent = function (){
    $.ajax({
      url: resourceUrl + '/' + $('#tb-studentid').val(),
      type: 'POST',
      data: {_method: 'delete'},
      success: function(){
        $successMessage
        .html('Student was successfully deleted')
        .show()
        .fadeOut(2000);
        reloadStudents();
      },
      error: function(err){
        $errorMessage
        .html('Error happened' + err)
        .show()
        .fadeOut(2000);
      }
    });
  };

  $(function () {
    reloadStudents();
    $('#btn-add-student').on('click', function () {
      var student;
      student = {
        name: $('#tb-name').val(),
        grade: $('#tb-grade').val()
      };
      addStudent(student);
    });
    $('#btn-delete-student').on('click', function(){
      deleteStudent();
    })
  });

}).call(this);