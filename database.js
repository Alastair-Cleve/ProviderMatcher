var providers = {
  1: { "solution-orientation": 6,
       "structured": 6,
       "active": 8,
       "practical": 4,
       "self-disclosure": 9,
       "gender": "Male",
       "birth_year": 1988,
       "ethnicity": "White",
       "sexual_orientation": "Straight",
       "locations": ["Noe Valley"] },

  2: { "solution-orientation": 6,
       "structured": 5,
       "active": 8,
       "practical": 8,
       "self-disclosure": 7,
       "gender": "Female",
       "birth_year": 1983,
       "ethnicity": "White",
       "sexual_orientation": "Straight",
       "locations": ["Pacific Heights"] },

  3: { "solution-orientation": 8,
       "structured": 8,
       "active": 8,
       "practical": 7,
       "self-disclosure": 7,
       "gender": "Male",
       "birth_year": 1963,
       "ethnicity": "White",
       "sexual_orientation": "Bisexual",
       "locations": ["Pacific Heights"] },

   4: {"solution-orientation":7,
       "structured":6,
       "active":9,
       "practical":10,
       "self-disclosure":7,
       "gender":"Female",
       "birth_year":1983,
       "ethnicity":"White",
       "sexual_orientation":"Straight",
       "locations": ["Hayes Valley/Lower Haight/Duboce Triangle"]},

   5:     {"solution-orientation":4,
   	"structured":2,
   	"active":6,
   	"practical":5,
   	"self-disclosure":1,
   	"gender":"Female",
   	"birth_year":1982,
   	"ethnicity":"White",
   	"sexual_orientation":"Gay/Lesbian",
   	"locations": ["Pacific Heights"]},

   6:     {"solution-orientation":3,
   	"structured":1,
   	"active":7,
   	"practical":9,
   	"self-disclosure":5,
   	"gender":"Female",
   	"birth_year":1984,
   	"ethnicity":"White",
   	"sexual_orientation":"Straight",
   	"locations": ["Marina/Cow Hollow"]},

   7:     {"solution-orientation":5,
   	"structured":1,
   	"active":5,
   	"practical":6,
   	"self-disclosure":2,
   	"gender":"Male",
   	"birth_year":1982,
   	"ethnicity":"White",
   	"sexual_orientation":"Bisexual",
   	"locations": ["Hayes Valley/Lower Haight/Duboce Triangle"]},

   8:     {"solution-orientation":3,
   	"structured":5,
   	"active":8,
   	"practical":10,
   	"self-disclosure":0,
   	"gender":"Female",
   	"birth_year":1976,
   	"ethnicity":"White",
   	"sexual_orientation":"Gay/lesbian",
   	"locations": ["Castro/Twin Peaks"]},

   9:     {"solution-orientation":7,
   	"structured":4,
   	"active":8,
   	"practical":10,
   	"self-disclosure":3,
   	"gender":"Male",
   	"birth_year":1979,
   	"ethnicity":"White",
   	"sexual_orientation":"Straight",
   	"locations": ["Marina/Cow Hollow"]},

   10:    {"solution-orientation":8,
   "structured":6,
   "active":8,
   "practical":10,
   "self-disclosure":5,
   "gender":"Female",
   "birth_year":1958,
   "ethnicity":"White",
   "sexual_orientation":"Straight",
   "locations": ["Pacific Heights"]},

   11:    {"solution-orientation":4,
   "structured":3,
   "active":7,
   "practical":8,
   "self-disclosure":4,
   "gender":"Female",
   "birth_year":1958,
   "ethnicity":"White",
   "sexual_orientation":"Straight",
   "locations": ["Richmond"]},

   12:    {"solution-orientation":5,
   "structured":0,
   "active":7,
   "practical":9,
   "self-disclosure":4,
   "gender":"Female",
   "birth_year":1970,
   "ethnicity":"White",
   "sexual_orientation":"Straight",
   "locations": ["Pacific Heights"]},

   13:    {"solution-orientation":6,
   "structured":3,
   "active":8,
   "practical":9,
   "self-disclosure":6,
   "gender":"Female",
   "birth_year":1970,
   "ethnicity":"White",
   "sexual_orientation":"Unknown",
   "locations": ["Pacific Heights","East Bay/Berkeley"]},

   14:    {"solution-orientation":4,
   "structured":3,
   "active":5,
   "practical":3,
   "self-disclosure":1,
   "gender":"Male",
   "birth_year":1979,
   "ethnicity":"Unknown",
   "sexual_orientation":"Gay/lesbian",
   "locations": ["Hayes Valley/Lower Haight/Duboce Triangle"]},

   15:    {"solution-orientation":7,
   "structured":6,
   "active":8,
   "practical":8,
   "self-disclosure":5,
   "gender":"Male",
   "birth_year":1973,
   "ethnicity":"White",
   "sexual_orientation":"Gay/lesbian",
   "locations": ["Financial District","Castro/Twin Peaks"]},

   16:    {"solution-orientation":7,
   "structured":3,
   "active":8,
   "practical":10,
   "self-disclosure":3,
   "gender":"Male",
   "birth_year":1969,
   "ethnicity":"White",
   "sexual_orientation":"Straight",
   "locations": ["Financial District"]},

   17:    {"solution-orientation":7,
   "structured":6,
   "active":8,
   "practical":3,
   "self-disclosure":5,
   "gender":"Male",
   "birth_year":1980,
   "ethnicity":"White",
   "sexual_orientation":"Gay/lesbian",
   "locations": ["Hayes Valley/Lower Haight/Duboce Triangle","Castro/Twin Peaks"]},

   18:    {"solution-orientation":5,
   "structured":7,
   "active":5,
   "practical":9,
   "self-disclosure":4,
   "gender":"Female",
   "birth_year":1979,
   "ethnicity":"Asian or Pacific Islander",
   "sexual_orientation":"Straight",
   "locations": ["East Bay/Berkeley","South Bay","Laurel Heights"]},

   19:    {"solution-orientation":5,
   "structured":3,
   "active":7,
   "practical":7,
   "self-disclosure":2,
   "gender":"Male",
   "birth_year":1965,
   "ethnicity":"Unknown",
   "sexual_orientation":"Unknown",
   "locations": ["Financial District","Union Square/Mid-Market"]},

   20:    {"solution-orientation":5,
   "structured":3,
   "active":7,
   "practical":5,
   "self-disclosure":3,
   "gender":"Female",
   "birth_year":1980,
   "ethnicity":"White",
   "sexual_orientation":"Bisexual",
   "locations": ["Financial District","SoMa"]},

   21:    {"solution-orientation":9,
   "structured":5,
   "active":9,
   "practical":10,
   "self-disclosure":8,
   "gender":"Female",
   "birth_year":1973,
   "ethnicity":"White",
   "sexual_orientation":"Straight",
   "locations": ["Financial District","East Bay/Berkeley"]},

   22:    {"solution-orientation":8,
   "structured":5,
   "active":8,
   "practical":10,
   "self-disclosure":4,
   "gender":"Female",
   "birth_year":1972,
   "ethnicity":"White",
   "sexual_orientation":"Straight",
   "locations": ["Mission/Dolores/Bernal Heights"]},

   23:    {"solution-orientation":7,
   "structured":2,
   "active":8,
   "practical":10,
   "self-disclosure":4,
   "gender":"Female",
   "birth_year":1981,
   "ethnicity":"White",
   "sexual_orientation":"Straight",
   "locations": ["Financial District","Marina/Cow Hollow"]},

   24:    {"solution-orientation":4,
   "structured":4,
   "active":8,"practical":7,
   "self-disclosure":3,
   "gender":"Female",
   "birth_year":1988,
   "ethnicity":"Asian or Pacific Islander",
   "sexual_orientation":"Pansexual",
   "locations": ["Mission/Dolores/Bernal Heights"]},

   25:    {"solution-orientation":7,
   "structured":6,
   "active":8,
   "practical":10,
   "self-disclosure":6,
   "gender":"Female",
   "birth_year":1975,
   "ethnicity":"White",
   "sexual_orientation":"Straight",
   "locations": ["Peninsula"]},

   26:    {"solution-orientation":9,
   "structured":8,
   "active":10,
   "practical":10,
   "self-disclosure":7,
   "gender":"Female",
   "birth_year":1984,
   "ethnicity":"White",
   "sexual_orientation":"Straight",
   "locations": ["Martinez"]},

   27:    {"solution-orientation":8,
   "structured":3,
   "active":6,
   "practical":7,
   "self-disclosure":2,
   "gender":"Female",
   "birth_year":1986,
   "ethnicity":"White",
   "sexual_orientation":"Straight",
   "locations": ["Mission/Dolores/Bernal Heights"]},

   28:    {"solution-orientation":7,
   "structured":5,
   "active":7,
   "practical":8,
   "self-disclosure":3,
   "gender":"Female",
   "birth_year":1976,
   "ethnicity":"Multiracial",
   "sexual_orientation":"Straight",
   "locations": ["Financial District"]},

   29:    {"solution-orientation":5,
   "structured":0,
   "active":5,
   "practical":10,
   "self-disclosure":0,
   "gender":"Female","birth_year":1976,
   "ethnicity":"Black or African American",
   "sexual_orientation":"Straight",
   "locations": ["Lower Pacific Heights"]},

   30:    {"solution-orientation":6,
   "structured":3,
   "active":8,
   "practical":8,"self-disclosure":6,
   "gender":"Female",
   "birth_year":1972,
   "ethnicity":"White",
   "sexual_orientation":"Gay/lesbian",
   "locations": ["Mission/Dolores/Bernal Heights"]},

   31:    {"solution-orientation":5,
   "structured":3,
   "active":5,
   "practical":7,
   "self-disclosure":5,
   "gender":"Female",
   "birth_year":1985,
   "ethnicity":"Multiracial",
   "sexual_orientation":"Straight",
   "locations": ["Financial District","Union Square/Mid-Market"]},

   32:    {"solution-orientation":5,
   "structured":5,
   "active":5,
   "practical":8,
   "self-disclosure":3,
   "gender":"Female",
   "birth_year":1985,
   "ethnicity":"White",
   "sexual_orientation":"Questioning/other",
   "locations": ["Mission/Dolores/Bernal Heights"]},

   33:    {"solution-orientation":3,
   "structured":4,
   "active":7,
   "practical":8,
   "self-disclosure":5,
   "gender":"Male",
   "birth_year":1989,
   "ethnicity":"Asian or Pacific Islander",
   "sexual_orientation":"Straight",
   "locations": ["Mission/Dolores/Bernal Heights"]},

   34:    {"solution-orientation":5,
   "structured":4,
   "active":9,
   "practical":9,
   "self-disclosure":2,
   "gender":"Female",
   "birth_year":1987,
   "ethnicity":"White",
   "sexual_orientation":"Straight",
   "locations": ["Financial District"]},

   35:    {"solution-orientation":5,
   "structured":5,
   "active":7,
   "practical":7,
   "self-disclosure":3,
   "gender":"Female",
   "birth_year":1982,
   "ethnicity":"White",
   "sexual_orientation":"Straight",
   "locations": ["Hayes Valley/Lower Haight/Duboce Triangle","Castro/Twin Peaks"]},

   36:    {"solution-orientation":4,
   "structured":2,
   "active":5,
   "practical":8,
   "self-disclosure":2,
   "gender":"Male",
   "birth_year":1984,
   "ethnicity":"Multiracial",
   "sexual_orientation":"Straight",
   "locations": ["Richmond"]},

   37:    {"solution-orientation":5,
   "structured":3,
   "active":6,
   "practical":8,
   "self-disclosure":2,
   "gender":"Female",
   "birth_year":1989,
   "ethnicity":"White",
   "sexual_orientation":"Questioning/other",
   "locations": ["Union Square/Mid-Market"]},

   38:    {"solution-orientation":10,
   "structured":7,
   "active":10,
   "practical":10,
   "self-disclosure":3,
   "gender":"Male",
   "birth_year":1974,
   "ethnicity":"Multiracial",
   "sexual_orientation":"Straight",
   "locations": ["Financial District"]},

   39:    {"solution-orientation":7,
   "structured":3,
   "active":8,
   "practical":9,
   "self-disclosure":3,
   "gender":"Male",
   "birth_year":1966,
   "ethnicity":"White",
   "sexual_orientation":"Unknown",
   "locations": ["Union Square/Mid-Market"]},

   40:    {"solution-orientation":8,
   "structured":3,
   "active":6,
   "practical":9,
   "self-disclosure":2,
   "gender":"Female",
   "birth_year":1978,
   "ethnicity":"White",
   "sexual_orientation":"Straight",
   "locations": ["Castro/Twin Peaks"]},

   41:    {"solution-orientation":4,
   "structured":3,
   "active":5,
   "practical":7,
   "self-disclosure":2,
   "gender":"Female",
   "birth_year":1978,
   "ethnicity":"White",
   "sexual_orientation":"Straight",
   "locations": ["Financial District"]},

   42:    {"solution-orientation":7,
   "structured":3,
   "active":7,
   "practical":7,
   "self-disclosure":4,
   "gender":"Female",
   "birth_year":1988,
   "ethnicity":"Asian or Pacific Islander",
   "sexual_orientation":"Bisexual",
   "locations": ["Noe Valley"]},

   43:    {"solution-orientation":6,
   "structured":1,
   "active":8,
   "practical":9,
   "self-disclosure":1,
   "gender":"Female",
   "birth_year":1951,
   "ethnicity":"Unknown",
   "sexual_orientation":"Unknown",
   "locations": ["Pacific Heights"]},

   44:    {"solution-orientation":6,
   "structured":5,
   "active":7,
   "practical":9,
   "self-disclosure":1,
   "gender":"Female",
   "birth_year":1966,
   "ethnicity":"White",
   "sexual_orientation":"Straight",
   "locations": ["Richmond"]},

   45:    {"solution-orientation":7,
   "structured":7,
   "active":7,
   "practical":8,
   "self-disclosure":6,
   "gender":"Female",
   "birth_year":1980,
   "ethnicity":"Middle Eastern or North African",
   "sexual_orientation":"Straight",
   "locations": ["Union Square/Mid-Market"]}

};

module.exports = providers;
