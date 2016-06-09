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
  last_name: "Gillette",
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

ron = User.create!(
  email: "ron@tristatecadillac.com",
  first_name: "Ron",
  last_name: "Cadillac",
  password: "oisdgrereesh",
  avatar: File.open(File.join(Rails.root, "/app/assets/images/ron.jpg"))
)

barry = User.create!(
  email: "barry@kgb.ru",
  first_name: "Barry",
  last_name: "Dylan",
  password: "yuiuykyujky",
  avatar: File.open(File.join(Rails.root, "/app/assets/images/barry.jpg"))
)

members = [malory, sterling, lana, cyril, pam, cheryl, ray, nil, nil, nil, nil]

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


### Projects

hr = fa.projects.create!(
  title: "Human Resources")
marketing = fa.projects.create!(
  title: "Marketing")
ra = fa.projects.create!(title: "Research and development")

fa_tasks = (0..6).map do
  fa.tasks.create!(
    title: Faker::Company.bs,
    description: Faker::Company.catch_phrase,
    due_date: Faker::Date.between(1.day.ago, 14.days.from_now),
    assignee: members.sample
  )
end

ra_tasks =[
  fa.tasks.create!(
    title: "Perform Burial for Piggly II",
    project: ra,
    due_date: Faker::Date.between(1.day.ago, 14.days.from_now),
    assignee: krieger,
    completed: (Random.rand * 1.5 > 1)
  ),
  fa.tasks.create!(
    title: "Revisit phase I of Human Ant Strength",
    project: ra,
    due_date: Faker::Date.between(1.day.ago, 14.days.from_now),
    assignee: krieger,
    completed: (Random.rand * 1.5 > 1)
  ),
  fa.tasks.create!(
    title: "Improve AI for holographic companion",
    project: ra,
    due_date: Faker::Date.between(1.day.ago, 14.days.from_now),
    assignee: krieger,
    completed: (Random.rand * 1.5 > 1)
  ),
  fa.tasks.create!(
    title: "Steal DNA samples from coworkers",
    project: ra,
    due_date: Faker::Date.between(1.day.ago, 14.days.from_now),
    assignee: krieger,
    completed: (Random.rand * 1.5 > 1)
  ),
  fa.tasks.create!(
    title: "Dump chemical waste in the Hudson",
    project: ra,
    due_date: Faker::Date.between(1.day.ago, 14.days.from_now),
    assignee: krieger,
    completed: (Random.rand * 1.5 > 1)
  ),
]

marketing_tasks = [
    fa.tasks.create!(
      title: "Enable extensible networks",
      project: marketing,
      due_date: Faker::Date.between(1.day.ago, 14.days.from_now),
      assignee: members.sample,
      completed: (Random.rand * 1.5 > 1)
    ),
    fa.tasks.create!(
      title: "Architect one-to-one infomediaries",
      project: marketing,
      due_date: Faker::Date.between(1.day.ago, 14.days.from_now),
      assignee: members.sample,
      completed: (Random.rand * 1.5 > 1)
    ),
    fa.tasks.create!(
      title: "Synergize integrated technologies",
      project: marketing,
      due_date: Faker::Date.between(1.day.ago, 14.days.from_now),
      assignee: members.sample,
      completed: (Random.rand * 1.5 > 1)
    ),
    fa.tasks.create!(
      title: "Synthesize global initiatives",
      project: marketing,
      due_date: Faker::Date.between(1.day.ago, 14.days.from_now),
      assignee: members.sample,
      completed: (Random.rand * 1.5 > 1)
    ),
    fa.tasks.create!(
      title: "Grow distributed action-items",
      project: marketing,
      due_date: Faker::Date.between(1.day.ago, 14.days.from_now),
      assignee: members.sample,
      completed: (Random.rand * 1.5 > 1)
    ),
]

hr_tasks = [
    fa.tasks.create!(
      title: "Organize Company Picnic",
      project: hr,
      due_date: Faker::Date.between(1.day.ago, 14.days.from_now),
      assignee: members.sample,
      completed: (Random.rand * 1.5 > 1)
    ),
    fa.tasks.create!(
      title: "Conduct Annual Performance Reviews",
      project: hr,
      due_date: Faker::Date.between(1.day.ago, 14.days.from_now),
      assignee: members.sample,
      completed: (Random.rand * 1.5 > 1)
    ),
    fa.tasks.create!(
      title: "Onboard new hires",
      project: hr,
      due_date: Faker::Date.between(1.day.ago, 14.days.from_now),
      assignee: members.sample,
      completed: (Random.rand * 1.5 > 1)
    ),
    fa.tasks.create!(
      title: "June Issue of company newsletter",
      project: hr,
      due_date: Faker::Date.between(1.day.ago, 14.days.from_now),
      assignee: members.sample,
      completed: (Random.rand * 1.5 > 1)
    ),
    fa.tasks.create!(
      title: "Enable extensible networks",
      project: hr,
      due_date: Faker::Date.between(1.day.ago, 14.days.from_now),
      assignee: members.sample,
      completed: (Random.rand * 1.5 > 1)
    ),
]
