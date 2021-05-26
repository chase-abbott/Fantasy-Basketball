import { mungeTeams } from '../src/utils.js';


test('Grabs five unqiue positions and remaing five from an array of 10', () => {
  const team = [
    {
      'playerId': 20000452,
      'name': 'Garrett Temple',
      'position': 'SG',
      'fantasyPoints': 23
    },
    {
      'playerId': 20000453,
      'name': 'Terrence Ross',
      'position': 'SG',
      'fantasyPoints': 37
    },
    {
      'playerId': 20000455,
      'name': 'Jonas Valanciunas',
      'position': 'C',
      'fantasyPoints': 52
    },
    {
      'playerId': 20000456,
      'name': 'DeMar DeRozan',
      'position': 'SG',
      'fantasyPoints': 61
    },
    {
      'playerId': 20000457,
      'name': 'Kyle Lowry',
      'position': 'PG',
      'fantasyPoints': 57
    },
    {
      'playerId': 20000440,
      'name': 'Marcin Gortat',
      'position': 'C',
      'fantasyPoints': 0
    },
    {
      'playerId': 20000441,
      'name': 'Bradley Beal',
      'position': 'SG',
      'fantasyPoints': 65
    },
    {
      'playerId': 20000442,
      'name': 'John Wall',
      'position': 'PG',
      'fantasyPoints': 57
    },
    {
      'playerId': 20000443,
      'name': 'Otto Porter Jr.',
      'position': 'SF',
      'fantasyPoints': 42
    },
    {
      'playerId': 20000458,
      'name': 'Amir Johnson',
      'position': 'PF',
      'fantasyPoints': 0
    }]
  const expected = mungeTeams(team);
  expect(expected).toBe(0);
})
