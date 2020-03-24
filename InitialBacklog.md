# Feature
Login uposlenika
## Item
Korisnik Seller mobilne aplikacije mora imati mogućnost da se loguje u aplikaciju sa pristupnim podacima koje dobiva od uprave, obzirom da je on uposlenik.
### Task
* Kreirati izgled screena za login
* Implementirati validaciju polja forme
* Implementirati slanje podataka iz forme ka serveru
* Implementirati ponašanje sistema u slučaju da su podaci prihvaćeni
* Implementirati ponašanje sistema u slučaju da su podaci odbijeni
* Uraditi push koda
* Napraviti pull request

# Feature
Pregled svih proizvoda
## Item
Korisnik Seller mobilne aplikacije mora imati mogućnost da vidi sve proizvode koje ima poslovnica. (dobavljanje informacija o svim proizvodima od (C))  Kada god se refresha spisak proizvoda, on se dobavlja sa servera.
### Task
* Kreirati izgled screena nakon uspješne prijave u aplikaciju
* Implementirati prikaz liste svih dostupnih proizvoda sa osnovnim informacijama (slika, naziv, cijena)
* Implementirati refresh dugme blizu liste koje šalje zahtjev serveru za novim podacima o proizvodima
* Uraditi push koda
* Napraviti pull request


# Feature
Provjera stanja i drugih informacija o artiklu
## Item
Korisnik Seller mobilne aplikacije mora imati uvid u dodatne informacije o proizvodima, kao što je broj trenutno dostupnih. (dobavljanje informacija o zalihama proizvoda od (C))
### Task
* Implementirati screen (ili modal ili slično) koji prikazuje dodatne informacije o artiklu
* Implementirati onclick event na svaki proizvod iz liste proizvoda koji otvara prethodno spomenuti prozor sa odgovarajućim podacima
* Uraditi push koda
* Napraviti pull request


# Feature
Pregled nedostupnih i kritičnih proizvoda
## Item
Korisnik Seller mobilne aplikacije treba moći na osnovu korisničkog interfejsa jednostavno zaključiti koji proizvod trenutno nije dostupan.
### Task
* Implementirati poseban izgled prizvoda u listi ukoliko je on nedostupan
* Implementirati poseban izgled prizvoda u listi ukoliko je on kritičan u zalihama
* Uraditi push koda
* Napraviti pull request


# Feature
Filtriranje proizvoda po imenu
## Item
Korisnik Seller mobilne aplikacije mora imati mogućnost da filtrira spisak proizvoda tako što se filtrirani proizvodi dobave sa servera.
### Task
* Dodati novo tekstualno polje iznad liste proizvoda u koje se može ukucati naziv proizvoda koji se traži 
* Implementirati slanje zahtjeva za filtriranje na server prilikom ili nakon kucanja naziva proizvoda
* Uraditi push koda
* Napraviti pull request

# Feature
Kreiranje narudžbe
## Item
Korisnik Seller mobilne aplikacije mora imati mogućnost da kreira novu narudžbu sa stavkama (proizvodima) koje klijent u poslovnici želi naručiti.
 ### Task
* Implementirati izgled screena za kreiranje narudžbe (obuhvatiti samo odabir proizvoda i dugme za potvrdu)
* Implementirati opciju na početnom ekranu za kreiranje nove narudžbe sa onclick eventom koji vodi ka prethodno spomenutom screenu
* Uraditi push koda
* Napraviti pull request

# Feature
Opcionalni unos broja stola ili informacije o usluženosti narudžbe
## Item
Korisnik Seller mobilne aplikacije mora imati mogućnost da, osim liste proizvoda, unese i dodatni opis ili napomenu prilikom kreiranja narudžbe kao npr. broj stola ili da li je narudžba uslužena.
### Task
* Dodati tekstualno polje u screenu za kreiranje narudžbe u koje se mogu unijeti broj stola ili informacija da li je narudžba uslužena
* Uraditi push koda
* Napraviti pull request

# Feature
Pregled stavki narudžbe
## Item
Korisnik Seller mobilne aplikacije mora uvijek imati uvid u stavke kreirane narudžbe da bi ih mogao proslijediti ostalim uposlenicima koji učestvuju u kreiranju narudžbe. Klikom na bilo koju narudžbu iz spiska narudžbi dobija informacije o njenim stavkama.
### Task
* Implementirati screen sa listom svih narudžbi (samo osnovne informacije o njima)
* Implementirati na početnom ekranu opciju za pregled svih narudžbi
* Implementirati screen (ili modal ili slično) sa dodatnim informacijama o narudžbi
* Implementirati onclick event na svaku narudžbu u listi koji prikazuje prethodno spomenuti screen sa odgovarajućim informacijama
* Uraditi push koda
* Napraviti pull request

# Feature
Uređivanje stavki narudžbe
## Item
Korisnik Seller mobilne aplikacije mora imati mogućnost da edituje stavke narudžbe prije zaključivanja narudžbe.
### Task
* Implementirati screen za editovanje stavke gdje je omogućeno promijeniti količinu odabranog proizvoda)
* Implementirati opciju koja će voditi ka prethodno spomenutom screenu (dvoklik, dugme sa strane i slično)
* Uraditi push koda
* Napraviti pull request

# Feature
Uređivanje stavki narudžbe
## Item
Korisnik Seller mobilne aplikacije mora imati mogućnost da edituje stavke narudžbe prije zaključivanja narudžbe.
### Task
* Implementirati screen za editovanje stavke gdje je omogućeno promijeniti količinu odabranog proizvoda)
* Implementirati opciju koja će voditi ka prethodno spomenutom screenu (dvoklik, dugme sa strane i slično)
* Uraditi push koda
* Napraviti pull request


# Feature
Uklanjanje stavki narudžbe
## Item
Korisnik Seller mobilne aplikacije mora imati mogućnost da ukloni određene stavke narudžbe prije zaključivanja narudžbe.
### Task
* Implementirati opciju koja će uklanjati stavke iz narudžbe (onclick event ili dugme)
* Uraditi push koda
* Napraviti pull request


# Feature
Otkazivanje narudžbe
## Item
Korisnik Seller mobilne aplikacije mora imati mogućnost da otkaže narudžbu u slučaju da se klijent u potpunosti predomisli oko naručivanja u tom objektu.
### Task
* Implementirati dugme na screenu za kreiranje narudžbe koje otkazuje čitav proces kreiranja
* Uraditi push koda
* Napraviti pull request


# Feature
Pregled neusluženih narudžbi
## Item
Korisnik Seller mobilne aplikacije mora imati mogućnost da razlikuje na korisničkom interfejsu koje narudžbe još uvijek nisu uslužene. 
### Task
* Implementirati provjeru da li tekstualno polje sa dodatnim informacijama (u screenu za kreiranje narudžbe) sadrži riječ “uslužena”
* Implementirati poseban izgled narudžbe u listi narudžbi, u slučaju da je ona uslužena
* Uraditi push koda
* Napraviti pull request

# Feature
Zaključivanje narudžbe
## Item
Korisnik Seller mobilne aplikacije mora imati mogućnost da zaključi narudžbu kada je siguran da klijent neće proširivati narudžbu. Tada se narudžba automatski treba obrisati iz spiska svih narudžbi. (seller app obavještava (C)  da je kreiran novi račun i upisuje se u bazu)
### Task
* Dodati dugme na screenu pregleda stavki narudžbe ili pregledu svih narudžbi (izabrati) za zaključivanje narudžbe
* Implementirati slanje serveru svih podataka koje ta narudžba sadrži
* Implementirati automatsko uklanjanje te narudžbe iz liste nakon slanja serveru
* Uraditi push koda
* Napraviti pull request

# Feature
Logout uposlenika
## Item
Korisnik Seller mobilne aplikacije mora imati mogućnost da se odjavi sa svog računa, kako niko drugi ne bi mogao zloupotrijebiti njegovu sesiju.
### Task
* Dodati opciju na početnom ekranu ili u meniju (izabrati) za logout
* Implementirati logout uposlenika
* Uraditi push koda
* Napraviti pull request

