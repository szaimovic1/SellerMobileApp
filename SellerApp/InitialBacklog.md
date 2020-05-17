# Feature
Login uposlenika
## Item
Korisnik Seller mobilne aplikacije mora imati mogućnost da se loguje u aplikaciju sa pristupnim podacima koje dobiva od uprave, obzirom da je on uposlenik.
### Task
* Kreirati izgled screena za login
* Implementirati validaciju polja forme
* Implementirati slanje podataka iz forme ka serveru
* Implementirati ponašanje sistema u slučaju da su podaci odbijeni prilikom logina
* Uraditi push koda
* Napraviti pull request

# Feature
Mogućnost pristupa samo određenim featurima
## Item
Korisnik Seller mobilne aplikacije treba imati mogućnost pristupa samo onim feature-ima koji su mu dozvoljeni zbog integriteta i sigurnosti podataka.
### Task
* Implementirati ponašanje sistema u slučaju da su podaci prihvaćeni prilikom logina i da user ima privilegije za pristup
* Implementirati ponašanje sistema u slučaju da user nema privilegije za pristup
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

# Feature
Pregled jelovnika od strane guest korisnika
## Item
Guest korisnik Seller mobilne aplikacije mora imati mogućnost pregleda jelovnika, sa detaljnim informacijama o svakom proizvodu (i sastav).
### Task
* Dodati početni ekran aplikacije na kojem će biti opcija za login uposlenika i za pregled jelovnika
* Ulogovati guest korisnika automatski prilikom pokretanja aplikacije
* Implementirati jelovnik kao swipe listu proizvoda, a kod svakog proizvoda prikazati sliku i informacije o njemu
* Dodati opcije za izlaz i kraj kreiranja narudžbe 
* Uraditi push koda
* Napraviti pull request

# Feature
Odabir željenih proizvoda sa jelovnika
## Item
Guest korisnik Seller mobilne aplikacije mora imati mogućnost da odabere proizvode koje želi naručiti.
### Task
* Dodati opciju za odabir određene količine prilikom prikaza svakog proizvoda posebno
* Implementirati kreiranje nove guest narudžbe koja sadrži odabrane proizvode
* Uraditi push koda
* Napraviti pull request

# Feature
Pregled odabranih proizvoda
## Item
Guest korisnik Seller mobilne aplikacije mora imati mogućnost da pregleda svoju narudžbu.
### Task
* Dodati ekran koji se prikaže nakon završetka odabira proizvoda koji sadrži odabrane proizvode, zajedno sa količinom i ukupnom cijenom narudžbe
* Ubaciti opciju za unos broja stola za kojim guest sjedi
* Uraditi push koda
* Napraviti pull request

# Feature
Uređivanje guest narudžbe
## Item
Guest korisnik Seller mobilne aplikacije mora imati mogućnost da se vrati i uredi narudžbu. 
### Task
* Kod pregleda guest narudžbe dodati opciju za povratak i uređivanje narudžbe
* Implementirati ispravno uređivanje narudžbe
* Uraditi push koda
* Napraviti pull request

# Feature
Spašavanje guest narudžbe
## Item
Guest korisnik Seller mobilne aplikacije mora imati mogućnost da spasi svoju narudžbu, čime se ona šalje na server.
### Task
* Kod pregleda guest narudžbe dodati opciju za spašavanje narudžbe
* Implementirati slanje guest narudžbe na server
* Nakon spašavanja, korisnik se treba automatski vratiti na početni ekran aplikacije
* Uraditi push koda
* Napraviti pull request

# Feature
Odustajanje od guest narudžbe
## Item
Guest korisnik Seller mobilne aplikacije mora imati mogućnost da odustane od narudžbe.
### Task
* Dodati opciju za izlaz prilikom pregleda narudžbe
* Uraditi push koda
* Napraviti pull request

# Feature
Pozivanje konobara
## Item
Guest korisnik Seller mobilne aplikacije mora imati mogućnost da pozove konobara putem aplikacije, pri čemu šalje svoj broj stola.
### Task
* Dodati opciju za slanje obavijesti konobaru
* Dodati opciju da se unese broj stola za kojim guest sjedi
* Implementirati slanje notifikacije konobaru
* Uraditi push koda
* Napraviti pull request

# Feature
Dobivanje obavijesti da guest poziva konobara
## Item
Korisnik Seller mobilne aplikacije mora dobiti obavijest da ga je neki gost zvao. 
### Task
* Implementirati primanje notifikacije da guest zove konobara
* Uraditi push koda
* Napraviti pull request

# Feature
Ažuriranje spiska narudžbi
## Item
Korisnik Seller mobilne aplikacije mora svakih 20 sekundi dobiti spisak svih narudžbi. 
### Task
* Implementirati slanje zahtjeva za guest narudžbe svakih 20 sekundi
* Uraditi push koda
* Napraviti pull request

# Feature
Razlikovanje nepročitanih i pročitanih guest narudžbi
## Item
Korisnik Seller mobilne aplikacije bi trebao da razlikuje nove narudžbe gostiju koje nije pregledao od onih koje jeste pregledao.
### Task
* Dodati novi atribut ‘seen’ u guest narudžbu
* Implementirati različit izgled nepročitane narudžbe
* Implementirati editovanje narudžbe (na serveru) nakon što se pročita
* Uraditi push koda
* Napraviti pull request

# Feature
Mijenjanje šifre računa
## Item
Korisnik Seller mobilne aplikacije mora moći promijeniti šifru svog korisničkog računa.
### Task
* Kreirati novi prozor u kojem se može promijeniti šifra
* Implementirati postavljanje nove šifre ukoliko se ukuca ispravna trenutna šifra
* Uraditi push koda
* Napraviti pull request

# Feature
Mijenjanje zaboravljene šifre računa
## Item
Korisnik Seller mobilne aplikacije mora moći promijeniti šifru svog korisničkog računa u slučaju da je zaboravi.
### Task
* Dodati opciju ‘Forgot password’ na login ekran
* Kreirati novi prozor sa opcijama za unos e-maila ili korisničkog imena, unos koda dobijenog na mail i unos nove šifre
* Implementirati slanje koda na e-mail 
* Osigurati da korisnik ne može promijeniti šifru ukoliko ne unese ispravan kod
* Uraditi push koda
* Napraviti pull request

# Feature
Grafički pregled stolova
## Item
Kao korisnik želim imati grafički prikaz stolova/ordinacija i sl.
### Task
* Kreirati novi prozor koji grafički prikazuje stolove/ordinacije 
* Implementirati dohvatanje stolova/ordinacija sa servera
* Uraditi push koda
* Napraviti pull request

# Feature
Filtriranje proizvoda sa jelovnika po sastojcima
## Item
Guest korisnik Seller mobilne aplikacije mora imati mogućnost pretrage proizvoda po sastojcima, npr. Sve bez glutena ili sve sa lososom. 
### Task
* Kreirati novi prozor koji sadrži sastojke proizvoda i opciju Contains
* Implementirati filtriranje tako da se prikažu samo proizvodi koji sadrže/ne sadrže odabrane sastojke
* Uraditi push koda
* Napraviti pull request

# Feature
Dobijanje push notifikacija ukoliko guest zove konobara
## Item
Korisnik Seller mobilne aplikacije mora imati mogućnost primanja push notifikacija ukoliko ga guest pozove.
### Task
* Implementirati slanje i primanje push notifikacija
* Uraditi push koda
* Napraviti pull request

# Feature
Uklanjanje unosa broja stola svakom uređaju
## Item
Guest korisnik aplikacije ne treba unositi ni u jednom dijelu procesa narudžbe broj stola za kojim sjedi.
### Task
* Ukloniti unos broja stola prilikom kreiranja guest narudžbe
* Ukloniti unos broja stola prilikom slanja obavijesti konobaru
* Uraditi push koda
* Napraviti pull request

# Feature
Dodavanje broja stola svakom uređaju
## Item
Korisnik aplikacije treba prvi put kada se pokreće aplikacija na uređaju odrediti broj stola koji će se odnositi na taj uređaj, a treba postojati i opcija za promjenom ovog broja, ali samo uz konobarove pristupne podatke.
### Task
* Implementirati novi ekran u kojem se bira koji je broj stola vezan za uređaj, koji je vidljiv samo ulogovanom konobaru
* Uraditi push koda
* Napraviti pull request

# Feature
Mijenjanje količine proizvoda prilikom naručivanja
## Item
Guest korisnik aplikacije ne treba unositi ručno količinu proizvoda koju želi prilikom naručivanja, već mu mijenjanje količine treba biti omogućeno pomoću ikonica + i -. 
### Task
* Zamijeniti ručne unose količine sa unosom pomoću + i - ikonica kod kreiranja guest narudžbe
* Zamijeniti ručne unose količine sa unosom pomoću + i - ikonica kod editovanja narudžbi
* Uraditi push koda
* Napraviti pull request

# Feature
Dobijanje push notifikacija kada se kreira guest narudžba
## Item
Korisnik aplikacije treba dobiti obavijest kada guest korisnik kreira narudžbu.
### Task
* Ukloniti periodično dohvatanje guest naružbi sa servera
* Implementirati dobivanje push notifikacija kada se kreira nova guest naružba
* Uraditi push koda
* Napraviti pull request
