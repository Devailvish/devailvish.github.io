function User() {
    var Firstname, Surname;
    this.setFirstName = function(newFirstName) {
        firstName = newFirstName;
    };

    this.setSurname = function(newSurname) {
        surname = newSurname;
    };

    this.getFullName = function() {
        return firstName + ' ' + surname;
    }
}

var user = new User();
user.setFirstName("Петя");
user.setSurname("Иванов");

alert( user.getFullName() ); // Петя Иванов