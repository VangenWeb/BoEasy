Prototyping av borettslag app for mamma

https://boeasy.vercel.app

seriøst bare funksjonalitet, null design, null optimalisering ish, mye, mye, mye prøving og testing av hvordan ting kan gjøres så mye er stygt. Blandt annet første gang jeg bruker MaterialUI, leker mye med Dialog, Snack, etc. som viser seg å være litt shitty. Dialog rerendres mye uten grunn eller nødvendighet. Merkes kanskje ikke så mye i prod som i dev though fra det jeg ser.

Bare mobil design per nå. Null insikt eller tid er lagt inn i responsivt design for pc per nå.

Mye som lages er tanker/testing av hvordan ting kan gjøres. IE. global vs local Snack/feedback og local/global dialog popups etc. Renders, hvordan ting rendres flere ganger ved x eller y metode av komponent. Hvordan jeg liker å ha query errors, return error eller throw error på backend. Så ting kan være ukonsist. List goes on, IconMenu props, skal items være const som settes inn eller bare gjøres det inline? Jeg subscriber egt litt til at render funksjonen skal være så lite bloata som mulig, så vi får se.

For å sette opp:
1: add .env variabler som .env.example.
a: Auth0 trenger api/client keys
2: enten mekk en psql/mysql database og koble opp den eller endre provider engine til sqlite i prisma/schema.prisma. Skal funke out of the box, kan hende man må fjerne no annotations for MySQL/Postgres
