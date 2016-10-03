exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('posts').insert({
            id: 1,
            title: 'The Man Trap',
            post_body: "Stardate 1513.1. Our position, orbiting planet M-113. On board the Enterprise, Mister Spock temporarily in command. On the planet the ruins of an ancient and long-dead civilisation. Ship's surgeon McCoy and myself are now beaming down to the planet's surface. Our mission, routine medical examination of archaeologist Robert Crater and his wife Nancy. Routine but for the fact that Nancy Crater is that one woman in Doctor McCoy's past.",
            author_id: 2,
            postDate: '2016-10-03 17:00:00'
        }),
        knex('posts').insert({
            id: 2,
            title: 'Charly X',
            post_body: "Star date 1533.6. Now manoeuvring to come alongside cargo vessel Antares. Its Captain and First officer are beaming over to us with an unusual passenger.",
            author_id: 2,
            postDate: '2016-10-03 17:00:00'
        }),
        knex('posts').insert({
            id: 3,
            title: 'Where No Man Has Gone Before',
            post_body: "Star date 1312.4. The impossible has happened. From directly ahead, we're picking up a recorded distress signal, the call letters of a vessel which has been missing for over two centuries. Did another Earth ship once probe out of the galaxy as we intend to do? What happened to it out there? Is this some warning they've left behind?",
            author_id: 3,
            postDate: '2016-10-03 17:00:00'
        })
      ]);
    });
};
