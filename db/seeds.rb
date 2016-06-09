# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


### Users

malory = User.create!(
  email: "marcher@fa.com",
  first_name: "Malory",
  last_name: "Archer",
  password: "guestpassword",
  avatar: File.open(File.join(Rails.root, "/app/assets/images/malory.jpg"))
)

sterling = User.create!(
  email: "sarcher@fa.com",
  first_name: "Sterling",
  last_name: "Archer",
  password: "fsdgfrhbgfhrtyh",
  avatar: File.open(File.join(Rails.root, "/app/assets/images/sterling.png"))
)

lana = User.create!(
  email: "lkane@fa.com",
  first_name: "Lana",
  last_name: "Kane",
  password: "fiojiojnih898",
  avatar: File.open(File.join(Rails.root, "/app/assets/images/lana.jpg"))
)

cheryl = User.create!(
  email: "cheryl@fa.com",
  first_name: "Cheryl",
  last_name: "Tunt",
  password: "aefwaerev",
  avatar: File.open(File.join(Rails.root, "/app/assets/images/cheryl.jpg"))
)

pam = User.create!(
  email: "ppoovey@fa.com",
  first_name: "Pam",
  last_name: "Poovey",
  password: "fretgrthjuyt",
  avatar: File.open(File.join(Rails.root, "/app/assets/images/pam.jpg"))
)

ray = User.create!(
  email: "rgillette@fa.com",
  first_name: "Ray",
  last_name: "Gillete",
  password: "dsfssdfsdfsdf",
  avatar: File.open(File.join(Rails.root, "/app/assets/images/ray.jpg"))
)

cyril = User.create!(
  email: "cfiggis@fa.com",
  first_name: "Cyril",
  last_name: "Figgis",
  password: "dsffsdfsdf",
  avatar: File.open(File.join(Rails.root, "/app/assets/images/cyril.jpg"))
)

krieger = User.create!(
  email: "kriegermd@fa.com",
  first_name: "Algernop",
  last_name: "Krieger",
  password: "oihiosdfh",
  avatar: File.open(File.join(Rails.root, "/app/assets/images/krieger.jpg"))
)


### Teams

fa = Team.create(name: "The Figgis Agency")

fa.memberships.create!(user: malory)
fa.memberships.create!(user: sterling)
fa.memberships.create!(user: lana)
fa.memberships.create!(user: pam)
fa.memberships.create!(user: cheryl)
fa.memberships.create!(user: krieger)
fa.memberships.create!(user: ray)
fa.memberships.create!(user: cyril)
