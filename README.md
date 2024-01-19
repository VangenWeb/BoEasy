Prototyping av borettslag app for muttern

https://boeasy.vercel.app

Seriøst bare funksjonalitet, null til lite design, mye prøving og testing av hvordan ting kan gjøres så mye er stygt. Leker med MaterialUI og tailwind, selv om mye er gjort med StyledComponents som er det jeg har jobbet mest med proffesjonelt. 
Ser på å konverte helt vekk fra StyledComponents (Emotion/styled ( samma greia )) for å kunne bruke AppRouter for å lære Server/Client components og server actions.

Bare mobilt design per nå. Null innsatts eller tid er lagt inn i responsivt design for pc.

Mye som lages er tanker/testing av hvordan ting kan gjøres.

For å sette opp:
1: add .env variabler som i .env.example.

a: Auth0 trenger api/client keys

2: enten mekk en psql/mysql database og koble opp den eller endre provider engine til sqlite i prisma/schema.prisma. Skal funke out of the box, kan hende man må fjerne no annotations for MySQL/Postgres

3: TinyMCE trenger api key, skal legge dette til .env senere. Men per nå ligger det i Editor komponenten hardkodet.

4: yarn dev, burde være ready to go
