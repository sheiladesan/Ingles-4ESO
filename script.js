const $=id=>document.getElementById(id);
const NAV=[['vocab','Vocabulario'],['gram','Gramática'],['irr','Verbos irregulares'],['irrp','Rellena la tabla'],['prac','Práctica'],['exam','Simulacros']];
$('nav').innerHTML=NAV.map(n=>`<button id="n_${n[0]}" onclick="go('${n[0]}')">${n[1]}</button>`).join('');
function go(s){NAV.forEach(n=>{$(n[0]).classList.toggle('on',n[0]==s);$('n_'+n[0]).classList.toggle('on',n[0]==s)});scrollTo(0,0)}
const norm=s=>s.toLowerCase().replace(/[’`]/g,"'").replace(/\s+/g,' ').replace(/[.!?]+$/,'').trim();
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};

/* ===== VOCAB ===== */
const CATS={E:'Emociones y sensaciones',H:'Aficiones'};
const V=`E|Shy / Shyness|tímido, timidez|She is shy with new people.|Es tímida con la gente nueva.
E|Frustrated / Frustration|frustrado, frustración|He felt frustrated because he failed again.|Se sintió frustrado porque volvió a suspender.
E|Bored / Boredom|aburrido, aburrimiento|I'm bored; there is nothing to do.|Estoy aburrido; no hay nada que hacer.
E|Surprised / Surprise|sorprendido, sorpresa|She was surprised by the gift.|Se sorprendió con el regalo.
E|Scared / Fear|asustado, miedo|The children were scared of the dark.|Los niños tenían miedo a la oscuridad.
E|Tired / Tiredness|cansado, cansancio|I'm tired after the match.|Estoy cansado después del partido.
E|Hot / Heat|acalorado, calor|He felt hot after running.|Se sintió acalorado después de correr.
E|Furious / Fury|furioso, furia|My dad was furious about the broken window.|Mi padre estaba furioso por la ventana rota.
E|Hungry / Hunger|hambriento, hambre|I'm hungry; let's eat.|Tengo hambre; vamos a comer.
E|Disgusted / Disgust|asqueado, asco|She was disgusted by the smell.|Le dio asco el olor.
E|In love / Love|enamorado, amor|They are in love.|Están enamorados.
E|Angry / Anger|enfadado, enfado|He was angry with his brother.|Estaba enfadado con su hermano.
E|Happy / Happiness|feliz, felicidad|We are happy because it's Friday.|Somos felices porque es viernes.
E|Sleepy / Sleepiness|somnoliento, sueño|The baby is sleepy.|El bebé tiene sueño.
H|Fishing|pescar|My grandfather loves fishing.|A mi abuelo le encanta pescar.
H|Painting|pintar|She enjoys painting landscapes.|Disfruta pintando paisajes.
H|Riding a horse|montar a caballo|Riding a horse is her favourite hobby.|Montar a caballo es su afición favorita.
H|Playing the guitar|tocar la guitarra|He practises playing the guitar every day.|Practica tocar la guitarra todos los días.
H|Hiking|hacer excursiones|We go hiking in the mountains.|Hacemos excursiones por la montaña.
H|Singing songs|cantar canciones|Singing songs makes me happy.|Cantar canciones me hace feliz.
H|Reading books|leer|Reading books helps you relax.|Leer libros ayuda a relajarse.
H|Doing puzzles|hacer puzzles|Doing puzzles is good for your brain.|Hacer puzzles es bueno para el cerebro.
H|Cycling|ciclismo|Cycling is good exercise.|El ciclismo es un buen ejercicio.
H|Listening to music|escuchar música|I like listening to music on the bus.|Me gusta escuchar música en el autobús.
H|Climbing|escalada|Climbing is difficult but exciting.|La escalada es difícil pero emocionante.
H|Watching TV|ver la tele|Watching TV is relaxing.|Ver la tele es relajante.
H|Taking photos|hacer fotos|She loves taking photos of animals.|Le encanta hacer fotos de animales.
H|Dancing|bailar|Dancing is fun with friends.|Bailar es divertido con amigos.
H|Cooking|cocinar|Cooking with my mum is fun.|Cocinar con mi madre es divertido.
H|Gardening|jardinería|Gardening is her grandma's hobby.|La jardinería es la afición de su abuela.`.split('\n').map((l,i)=>{const p=l.split('|');return{id:i,c:p[0],en:p[1],es:p[2],ex:p[3],exs:p[4]}});
let learned=new Set();try{learned=new Set(JSON.parse(localStorage.getItem('lrn')||'[]'))}catch(e){}
let shown=new Set();
$('cat').innerHTML='<option value="">Todas las categorías</option>'+Object.entries(CATS).map(c=>`<option value="${c[0]}">${c[1]}</option>`).join('');
function rv(){const q=norm($('q').value),c=$('cat').value;
 $('vg').innerHTML=V.filter(w=>(!c||w.c==c)&&(!q||norm(w.en+' '+w.es).includes(q))).map(w=>`<div class="card" style="${learned.has(w.id)?'background:var(--okl)':''}"><div class="tag">${CATS[w.c]}</div><div class="en">${w.en}</div>
 ${shown.has(w.id)?`<div>${w.es}</div>${w.ex?`<div class="ex">${w.ex}<br>${w.exs}</div>`:''}`:'<div class="tag">Traducción oculta</div>'}
 <div class="row" style="margin-top:8px"><button class="b s" onclick="tg(${w.id})">${shown.has(w.id)?'Ocultar':'Mostrar'}</button><button class="b ${learned.has(w.id)?'':'s'}" onclick="ln(${w.id})">${learned.has(w.id)?'✓ Aprendida':'Marcar aprendida'}</button></div></div>`).join('')||'<p>Sin resultados.</p>';
 const p=Math.round(learned.size/V.length*100);$('pct').textContent=`Estudiado: ${learned.size} de ${V.length} (${p}%)`;$('pb').style.width=p+'%'}
function tg(i){shown.has(i)?shown.delete(i):shown.add(i);rv()}
function ln(i){learned.has(i)?learned.delete(i):learned.add(i);try{localStorage.setItem('lrn',JSON.stringify([...learned]))}catch(e){}rv()}
function allT(f){shown=f?new Set(V.map(w=>w.id)):new Set();rv()}

/* ===== GRAMMAR ===== */
const G=[
['Past Simple','Acciones terminadas en un momento concreto del pasado. También los hechos principales de una historia.','Afirmativa: verbo + -ed (play → played) o forma irregular (go → went). Negativa: didn\'t + verbo base. Pregunta: Did + sujeto + verbo base. Después de did / didn\'t el verbo NO va en pasado.','yesterday, last night / week / year, ago, in 2020, when (+ pasado), then','I visited my grandparents last weekend. (Visité a mis abuelos el fin de semana pasado: ya terminó y sabemos cuándo.)','Decir «Did you went?» (correcto: Did you go?) o «I didn\'t played» (correcto: I didn\'t play).','Si ves una fecha o «yesterday / last… / ago», es Past Simple.'],
['Present Perfect Simple','Acciones del pasado que importan ahora: experiencias de la vida, cosas que acaban de pasar, resultados que se ven ahora y situaciones que empezaron antes y siguen. No se dice cuándo pasó.','Afirmativa: have / has + participio (have played, has gone). Negativa: haven\'t / hasn\'t + participio. Pregunta: Have / Has + sujeto + participio. He, she, it → has.','ever, never, already, yet, just, so far, recently, for, since','I have lost my phone. (He perdido el móvil: ahora no lo tengo.) / Have you ever been to London? (¿Has estado alguna vez en Londres?)','Usarlo con una fecha: «I have seen him yesterday» (correcto: I saw him yesterday).','Si no se dice cuándo pasó, o aparece ever / never / just / already / yet, piensa en Present Perfect.'],
['For y since','Se usan con el Present Perfect (Simple o Continuous) para decir desde cuándo o cuánto tiempo dura algo.','FOR + cantidad de tiempo: for two hours, for a month, for years. SINCE + momento en que empezó: since Monday, since 2019, since I was ten. Van con have / has + participio o have / has been + -ing.','for, since, how long','I have lived here for five years. = I have lived here since 2021. (Vivo aquí desde hace cinco años = desde 2021.)','Mezclarlos: «since two hours» (correcto: for two hours) o «for Monday» (correcto: since Monday).','¿Hay una cantidad de tiempo (two hours)? → for. ¿Hay un momento de inicio (Monday, 2020)? → since.'],
['Present Perfect Continuous','Acción que empezó en el pasado y sigue ahora, o que acaba de terminar y vemos el resultado. Importa la duración («llevo haciendo…»).','Afirmativa: have / has been + verbo-ing. Negativa: haven\'t / hasn\'t been + -ing. Pregunta: Have / Has + sujeto + been + -ing. Los verbos de estado (know, like, want) no se usan en continuo.','for, since, how long, all day, lately, recently','She has been studying for two hours. (Lleva dos horas estudiando.) / My eyes are red because I have been crying. (Tengo los ojos rojos porque he estado llorando.)','Olvidar «been» («I have waiting») o usarlo con verbos de estado («I have been knowing»).','Si preguntan «How long…?» o la acción dura hasta ahora, usa have been + -ing. Si interesa el resultado o cuántas veces, usa el simple.'],
['Past Perfect','Acción que ocurrió ANTES que otra acción del pasado. Es «el pasado del pasado».','Afirmativa: had + participio (had finished). Negativa: hadn\'t + participio. Pregunta: Had + sujeto + participio. Es igual para todos los sujetos.','before, after, by the time, already, when, until','When I arrived, the film had already started. (Primero empezó la película y después llegué yo.)','Poner Past Simple en la acción que pasó primero, o usar had cuando solo hay una acción pasada.','Mira las dos acciones: la que pasó PRIMERO va en had + participio; la segunda, en Past Simple.'],
['Narrative sentences','Sirven para contar una historia en pasado. Se combinan tres tiempos: Past Simple para los hechos (en orden), Past Continuous para lo que estaba pasando de fondo y Past Perfect para lo que había pasado antes.','Past Simple: sucesos de la historia. Past Continuous (was / were + -ing): lo que estaba pasando. Past Perfect (had + participio): lo anterior. Conectores: when, while, as, suddenly, then, after that, finally, before, after, by the time.','one day, suddenly, while, when, then, after that, finally, in the end, by the time','It was raining (fondo) when I left home (hecho). I realised that I had forgotten (anterior) my keys.','Poner todos los verbos en Past Simple. Tras while suele ir Past Continuous: «While I was walking…».','¿Qué estaba pasando de fondo? Continuous. ¿Qué pasó de pronto? Simple. ¿Qué había pasado antes? Past Perfect.'],
['Question tags','Son preguntas cortas al final de una frase para pedir confirmación («¿verdad?», «¿no?»). Si la frase es afirmativa, el tag es negativo; si es negativa, el tag es afirmativo.','Afirmativa + auxiliar negativo + pronombre: She is tall, isn\'t she? Negativa + auxiliar afirmativo + pronombre: You don\'t like fish, do you? Se repite el auxiliar de la frase (is, have, did, will…). Sin auxiliar: Present Simple → do / does; Past Simple → did. Casos especiales: I am → aren\'t I?; Let\'s → shall we?','isn\'t it?, don\'t you?, did he?, haven\'t they?, won\'t she?','You play tennis, don\'t you? / They haven\'t arrived, have they? / He went home, didn\'t he?','Repetir el nombre en vez del pronombre («Anna is late, isn\'t Anna?») o no cambiar entre afirmativo y negativo.','Mira el auxiliar de la frase, cámbialo a negativo (o afirmativo) y añade el pronombre. Si no hay auxiliar, piensa en do / does / did.'],
['Forms (formas verbales)','Cada verbo tiene tres formas: infinitivo, pasado (Past Simple) y participio (Present Perfect y Past Perfect). En los regulares las dos últimas son iguales (-ed). Los irregulares hay que aprenderlos.','Regulares: play – played – played; study – studied – studied; stop – stopped – stopped. Irregulares: be – was/were – been; go – went – gone; have – had – had; do – did – done; see – saw – seen; take – took – taken; write – wrote – written; buy – bought – bought; eat – ate – eaten; come – came – come; give – gave – given; know – knew – known; make – made – made; meet – met – met.','Past Simple usa la 2.ª columna; Present Perfect y Past Perfect usan la 3.ª.','I went to Rome (Past Simple). I have been to Rome (Present Perfect). I had gone to Rome (Past Perfect).','Mezclar la 2.ª y la 3.ª columna: «I have went» (correcto: I have gone) o «I seen» (correcto: I saw).','Con have / has / had usa siempre la 3.ª forma. En pasado y sin auxiliar, usa la 2.ª.']];
$('gd').innerHTML=G.map((g,i)=>`<details><summary>${i+1}. ${g[0]}</summary><h3>A. ¿Cuándo se utiliza?</h3><p>${g[1]}</p><h3>B. Estructura</h3><p>${g[2]}</p><h3>C. Palabras clave</h3><p>${g[3]}</p><h3>D. Ejemplo</h3><p class="ex">${g[4]}</p><h3>E. Error frecuente</h3><p>${g[5]}</p><h3>F. Truco para identificarlo</h3><p>${g[6]}</p></details>`).join('');
$('tb').innerHTML='<tr><th>Tiempo</th><th>Uso principal</th><th>Estructura</th><th>Palabras clave</th><th>Ejemplo</th></tr>'+G.map(g=>`<tr><td><b>${g[0]}</b></td><td>${g[1]}</td><td>${g[2].split('. ')[0].replace('Afirmativa: ','')}</td><td>${g[3]}</td><td>${g[4].split(' (')[0]}</td></tr>`).join('');
$('dif').innerHTML='<h3>Diferencias clave</h3>'+[['Past Simple vs. Present Perfect','Past Simple = momento concreto ya terminado (yesterday, in 2019, ago). Present Perfect = no importa cuándo, y tiene relación con ahora («I have visited Paris»).'],['Present Perfect Simple vs. Continuous','Simple = resultado o cuántas veces («I have read three books»). Continuous = duración, la acción sigue o acaba de parar («I have been reading for two hours»).'],['Past Perfect vs. Past Simple','Past Perfect = lo que pasó ANTES. Past Simple = lo que pasó después («When I arrived, she had left»).'],['Present Perfect vs. Past Perfect','Present Perfect conecta el pasado con AHORA («I have finished»). Past Perfect conecta con OTRO momento del pasado («I had finished when you called»).'],['For vs. since','For + cuánto tiempo (for two years). Since + cuándo empezó (since 2022).']].map(d=>`<div class="card"><b>${d[0]}</b><br>${d[1]}</div>`).join('');

/* ===== QUESTIONS: [tag,text,answers('|'),explanation,options] ===== */
const PQ=[
['Past Simple','She ___ (visit) her aunt last Sunday.','visited','«Last Sunday» → Past Simple.'],
['Past Simple','We ___ (not go) to the beach yesterday.',"didn't go|did not go",'Negativa: didn\'t + verbo base.'],
['Past Simple','Elige: ___ you see the match last night?','Did','Pregunta en pasado → Did + verbo base.',['Did','Do','Have']],
['Past Simple','I ___ (buy) this jacket two weeks ago.','bought','«Ago» → Past Simple; buy es irregular.'],
['Present Perfect Simple','I ___ (never/eat) sushi.','have never eaten','«Never» → have + participio.'],
['Present Perfect Simple','She ___ (just/leave).','has just left','«Just» → Present Perfect; she → has.'],
['Present Perfect Simple','Elige: ___ you ever been to Paris?','Have','«Ever» → Present Perfect; you → Have.',['Did','Have','Has']],
['Present Perfect Simple','Elige: Look! She ___ her arm.','has broken','«Look!»: vemos el resultado ahora.',['broke','has broken','was breaking']],
['For y since','Elige: I have lived here ___ 2018.','since','2018 es el momento en que empezó → since.',['for','since','ago']],
['For y since','Elige: She has worked here ___ three years.','for','«Three years» es una cantidad de tiempo → for.',['for','since','from']],
['For y since','Escribe for o since: They have been friends ___ they were five.','since','«They were five» marca cuándo empezó → since.'],
['For y since','Escribe for o since: We have waited ___ twenty minutes.','for','Cantidad de tiempo → for.'],
['Present Perfect Continuous','I ___ (wait) for you for an hour.','have been waiting','Duración con «for» → have been + -ing.'],
['Present Perfect Continuous','He ___ (play) the guitar since he was ten.','has been playing','«Since» + acción que continúa.'],
['Present Perfect Continuous','Elige: How long ___ English?','have you been learning','«How long…?» → Present Perfect Continuous.',['have you been learning','are you learning','did you learn']],
['Present Perfect Continuous','It ___ (rain) all day.','has been raining','«All day» + duración hasta ahora.'],
['Past Perfect','When we arrived, the film ___ (already/start).','had already started','Empezó antes de que llegáramos.'],
['Past Perfect','She was sad because she ___ (lose) her keys.','had lost','Perder las llaves ocurrió antes de estar triste.'],
['Past Perfect','Elige: After he ___ lunch, he went out.','had eaten','Primero comió, después salió.',['ate','had eaten','has eaten']],
['Past Perfect','The teacher was angry because I ___ (not do) my homework.',"hadn't done|had not done",'No hacer los deberes ocurrió antes de que se enfadara.'],
['Narrative sentences','While I ___ (walk) to school, I saw an accident.','was walking','«While» + acción de fondo → Past Continuous.'],
['Narrative sentences','Elige: Suddenly, the door ___.','opened','«Suddenly»: hecho puntual → Past Simple.',['opened','was opening','had opened']],
['Narrative sentences','It was dark and it ___ (rain) when we left.','was raining','Descripción de fondo → Past Continuous.'],
['Narrative sentences','Elige: He was late because he ___ the bus.','had missed','Perder el bus pasó antes de llegar tarde.',['missed','had missed','was missing']],
['Question tags','Elige: She is tall, ___?',"isn't she",'Frase afirmativa → tag negativo con el mismo auxiliar.',["isn't she",'is she',"doesn't she"]],
['Question tags',"Elige: You don't like fish, ___?",'do you','Frase negativa → tag afirmativo.',["don't you",'do you','did you']],
['Question tags','Escribe el tag: They have finished, ___ ___?',"haven't they",'Auxiliar have → haven\'t + pronombre.'],
['Question tags','Escribe el tag: He went home, ___ ___?',"didn't he",'Past Simple sin auxiliar → didn\'t.'],
['Question tags',"Elige: Let's go out, ___?",'shall we','«Let\'s» → shall we?',['will we','shall we',"don't we"]],
['Forms','Escribe el participio de «write»: I have ___ a letter.','written','write – wrote – written.'],
['Forms','Escribe el pasado de «take»: She ___ the bus yesterday.','took','take – took – taken.'],
['Forms','Elige: She has ___ to Rome twice.','been','Experiencia → have been to.',['was','been','went']],
['Corrección','Corrige: I have seen him yesterday.','i saw him yesterday','Con «yesterday» → Past Simple.'],
['Corrección','Corrige: She has lived here since five years.','she has lived here for five years','«Five years» → for.'],
['Traducción','Traduce: ¿Has terminado ya?','have you finished yet|have you already finished|have you finished already','Present Perfect con yet / already.']];
PQ.push(
['Past Simple','They ___ (arrive) at nine o\'clock last night.','arrived','«Last night» → Past Simple.'],
['Past Simple','She ___ (write) an email yesterday.','wrote','write es irregular: wrote.'],
['Present Perfect Simple','We ___ (not finish) the project yet.',"haven't finished|have not finished",'«Yet» en negativa → haven\'t + participio.'],
['Present Perfect Simple','Elige: I ___ this song before.','have heard','Experiencia sin fecha → Present Perfect.',['heard','have heard','was hearing']],
['For y since',"Elige: We have been here ___ 9 o'clock.",'since','Las 9 es el momento de inicio → since.',['for','since','ago']],
['For y since','Escribe for o since: He has played the piano ___ six years.','for','Cantidad de tiempo → for.'],
['Present Perfect Continuous','I ___ (work) all day.','have been working','«All day» + duración.'],
['Present Perfect Continuous','She ___ (not/sleep) well lately.',"hasn't been sleeping|has not been sleeping",'«Lately» → Present Perfect Continuous.'],
['Past Perfect',"I couldn't enter because I ___ (forget) my key.",'had forgotten','Olvidar la llave fue antes.'],
['Past Perfect','Elige: When he arrived, we ___ already eaten.','had','Past Perfect: had + participio.',['had','have','were']],
['Narrative sentences','We ___ (walk) in the park when we found a wallet.','were walking','Acción en progreso interrumpida.'],
['Narrative sentences','Elige: First he opened the box, then he ___ the letter.','read','Hechos seguidos de la historia → Past Simple.',['read','was reading','had read']],
['Question tags','Escribe el tag: She can swim, ___ ___?',"can't she",'Auxiliar can → can\'t she.'],
['Question tags',"Escribe el tag: It isn't cold, ___ ___?",'is it','Frase negativa → tag afirmativo.'],
['Forms','Escribe el participio de «see»: I have ___ that film twice.','seen','see – saw – seen.'],
['Forms','Escribe el pasado de «buy»: I ___ a gift for her.','bought','buy – bought – bought.'],
['Mixto','I ___ (live) in this town since 2019.','have lived|have been living','«Since 2019» → Present Perfect.'],
['Mixto','Yesterday we ___ (watch) a great film.','watched','«Yesterday» → Past Simple.'],
['Mixto','When I got home, my brother ___ (already/eat) all the pizza.','had already eaten','Comió antes de que yo llegara.'],
['Mixto','She ___ (study) English for three years.','has studied|has been studying','«For three years» → Present Perfect.'],
['Mixto','While we ___ (have) lunch, it started to rain.','were having','«While» + acción en progreso.'],
['Mixto','I ___ (never/see) a snake in my life.','have never seen','Experiencia de vida → Present Perfect.'],
['Mixto','Last summer they ___ (go) to Italy.','went','«Last summer» → Past Simple.'],
['Mixto','He is tired because he ___ (run) for an hour.','has been running','Duración con resultado visible ahora.'],
['Mixto','She ___ (not/finish) her homework yet.',"hasn't finished|has not finished",'«Yet» → Present Perfect.'],
['Mixto','When the teacher came in, the students ___ (talk).','were talking','Estaban hablando cuando entró.'],
['Mixto','By the time he called, I ___ (already/leave).','had already left','Me fui antes de su llamada.'],
['Mixto','Look! Someone ___ (break) the window.','has broken','«Look!»: resultado visible ahora.'],
['Mixto','I ___ (not/see) Maria since Friday.',"haven't seen|have not seen",'«Since Friday» → Present Perfect.'],
['Mixto','He told me he ___ (visit) London before.','had visited','Visitar fue anterior a «told».'],
['Mixto','Tom plays well because he ___ (practise) a lot lately.','has been practising|has been practicing','«Lately» → Present Perfect Continuous.'],
['Mixto','Completa con el question tag (dos palabras): You have finished, ___ ___?',"haven't you",'Afirmativa con have → haven\'t you.'],
['Mixto','We ___ (meet) at the party last Saturday.','met','«Last Saturday» → Past Simple.']);
const EQ=[
['sp','Past Simple','My parents ___ (meet) in 1998.','met','Año concreto → Past Simple.'],
['sp','Past Simple','Elige: When ___ you get home yesterday?','did','Pregunta con «yesterday» → did.',['did','have','were']],
['sp','Present Perfect Simple','We ___ (already/see) that film.','have already seen','«Already» → Present Perfect.'],
['sp','Present Perfect Simple','Elige: ___ she ever won a prize?','Has','«Ever» + she → Has.',['Did','Has','Have']],
['sp','For y since','Elige: He has been ill ___ Friday.','since','Friday es cuándo empezó → since.',['for','since','ago']],
['sp','For y since','Elige: They have known each other ___ ten years.','for','Cantidad de tiempo → for.',['for','since','from']],
['sp','Present Perfect Continuous','My brother ___ (study) for three hours.','has been studying','Duración con «for».'],
['sp','Present Perfect Continuous','Elige: Your hands are dirty. What ___?','have you been doing','Acción reciente con resultado visible.',['did you do','have you been doing','are you done']],
['sp','Past Perfect','The film ___ (already/finish) when we got to the cinema.','had already finished','Terminó antes de que llegáramos.'],
['sp','Past Perfect','Elige: She said she ___ him before.','had met','Conocerlo fue anterior a «said».',['met','had met','has met']],
['sp','Narrative sentences','The phone rang while I ___ (have) a shower.','was having','«While» + acción en progreso.'],
['sp','Narrative sentences','Elige: When I got to the station, the train ___.','had left','Se fue antes de que yo llegara.',['left','had left','was leaving']],
['sp','Question tags','Elige: Tom plays football, ___?',"doesn't he",'Present Simple afirmativo → doesn\'t he.',["doesn't he",'does he',"isn't he"]],
['sp','Question tags',"Escribe el tag: You weren't at home, ___ ___?",'were you','Frase negativa → tag afirmativo.'],
['sp','Forms','Escribe el participio de «eat»: I have ___ breakfast.','eaten','eat – ate – eaten.'],
['sp','Forms','Elige: She ___ me the answer yesterday.','gave','Pasado sin auxiliar → 2.ª forma.',['gave','given','has given']],
['mx','Mixta','Elige: I ___ here since I was a child.','have lived','«Since» → Present Perfect.',['have lived','lived','had lived']],
['mx','Mixta',"I ___ (not see) her since Monday.","haven't seen|have not seen",'«Since Monday» → Present Perfect.'],
['mx','Mixta',"Elige: I couldn't get in because I ___ my key.",'had lost','Perder la llave fue antes.',['lost','had lost','have lost']],
['mx','Mixta','Look at his face! He ___ (cry).','has been crying','Resultado visible de una acción reciente.'],
['mx','Mixta','Elige: Yesterday I ___ Ana in the street.','met','«Yesterday» → Past Simple.',['met','have met','had met']],
['mx','Mixta','We ___ (wait) for the bus when it started to rain.','were waiting','Acción en progreso interrumpida.'],
['mx','Mixta','Elige: They ___ in Paris since 2020.','have lived','«Since 2020» → Present Perfect.',['lived','have lived','had lived']],
['mx','Mixta','After she ___ (finish) her homework, she went out.','had finished','Primero terminó, después salió.'],
['tr','Transformación','Escribe en negativa: She has finished.',"she hasn't finished|she has not finished",'Haven\'t / hasn\'t + participio.'],
['tr','Transformación','Haz una pregunta: They have lived here for years.','have they lived here for years','Have + sujeto + participio.'],
['tr','Corrección','Corrige: She has lived here since three years.','she has lived here for three years','«Three years» → for.'],
['tr','Corrección','Corrige: I have went to London.','i have gone to london|i have been to london','Participio de go: gone (o been).'],
['tr','Transformación','Añade el tag: He is a teacher, ___ ___?',"isn't he",'Afirmativa → tag negativo.'],
['tr','Transformación','Escribe en negativa: I had eaten.',"i hadn't eaten|i had not eaten",'Hadn\'t + participio.']];
const TX='Texto narrativo: «One evening I (1)___ (walk) home when I (2)___ (see) a strange light. I (3)___ (realise) that I (4)___ (leave) my phone at school, so I went back. I (5)___ (not run) like that since I was ten!»';
[['Hueco 1: walk','was walking','Acción en progreso.'],['Hueco 2: see','saw','Hecho puntual que interrumpe.'],['Hueco 3: realise','realised','Hecho de la historia → Past Simple.'],['Hueco 4: leave','had left','Anterior a «realised».'],['Hueco 5: not run',"haven't run|have not run",'«Since» → Present Perfect.']].forEach(p=>EQ.push(['mx','Mixta',p[0],p[1],p[2],null,TX]));
const EQ2=[
['sp','Past Simple',"We ___ (not watch) TV last night.","didn't watch|did not watch",'Did not + verbo base.'],
['sp','Past Simple','Elige: She ___ to Spain in 2019.','went','Año concreto → Past Simple.',['went','has gone','was going']],
['sp','Present Perfect Simple','They ___ (already/finish) lunch.','have already finished','«Already» → Present Perfect.'],
['sp','Present Perfect Simple','Elige: Have you finished ___?','yet','«Yet» en preguntas → Present Perfect.',['yet','ago','last week']],
['sp','For y since','Elige: She has been a teacher ___ 2010.','since','2010 es cuándo empezó → since.',['for','since','ago']],
['sp','For y since','Escribe for o since: I have known him ___ a long time.','for','Cantidad de tiempo → for.'],
['sp','Present Perfect Continuous','We ___ (look) for you all morning!','have been looking','«All morning» + duración.'],
['sp','Present Perfect Continuous','Elige: He ___ for two hours and he is still reading.','has been reading','Acción que sigue.',['has been reading','read','had read']],
['sp','Past Perfect','I ___ (never/see) the sea before I went to Cádiz.','had never seen','Nunca lo había visto antes de ir.'],
['sp','Past Perfect','Elige: She was happy because she ___ the exam.','had passed','Aprobar fue antes de estar feliz.',['passed','had passed','has passed']],
['sp','Narrative sentences','I ___ (cook) when the lights went out.','was cooking','Acción en progreso interrumpida.'],
['sp','Narrative sentences','Elige: After she ___ the door, she went in.','had opened','Primero abrió, después entró.',['opened','had opened','was opening']],
['sp','Question tags','Elige: They are late, ___?',"aren't they",'Afirmativa con are → aren\'t they.',["aren't they",'are they',"don't they"]],
['sp','Question tags',"Escribe el tag: She doesn't know, ___ ___?",'does she','Negativa → tag afirmativo.'],
['sp','Forms','Escribe el participio de «drink»: I have ___ my water.','drunk','drink – drank – drunk.'],
['sp','Forms','Elige: We ___ a good film last night.','saw','Pasado sin auxiliar → 2.ª forma.',['saw','seen','have seen']],
['mx','Mixta','Elige: By the time I arrived, the match ___.','had started','Empezó antes de que llegara.',['started','had started','is starting']],
['mx','Mixta','I ___ (visit) Granada three times so far.','have visited','«So far» → Present Perfect.'],
['mx','Mixta','Elige: He ___ his leg while he was skiing.','broke','Hecho puntual en pasado.',['broke','has broken','had broken']],
['mx','Mixta',"She ___ (wait) here since 7 o'clock.",'has been waiting','«Since» + acción que sigue.'],
['mx','Mixta','Elige: We ___ the bus because we were late.','missed','Hecho del pasado.',['missed','have missed','were missing']],
['mx','Mixta','Last year, my cousin ___ (win) a prize.','won','«Last year» → Past Simple.'],
['tr','Transformación','Haz una pregunta con «How long»: She has lived here for years.','how long has she lived here','How long + has + sujeto + participio.'],
['tr','Corrección','Corrige: We have been there yesterday.','we were there yesterday|we went there yesterday','Con «yesterday» → Past Simple.'],
['tr','Transformación','Escribe en negativa: They had arrived.',"they hadn't arrived|they had not arrived",'Hadn\'t + participio.'],
['tr','Transformación','Añade el tag: Maria can drive, ___ ___?',"can't she",'Afirmativa → tag negativo.']];
const BK=['hungry','shy','scared','bored','fishing','furious','dancing','tired'],BT='Banco de palabras: completa cada frase. Sobran palabras.';
[['I am ___ because I did not have breakfast.','hungry'],['She never speaks in class because she is very ___.','shy'],['He was ___ when he saw the spider.','scared'],['The film was long and I felt ___.','bored'],['My brother loves ___: he catches fish at the lake.','fishing']].forEach(p=>EQ2.push(['voc','Vocabulario',p[0],p[1],'La palabra correcta es «'+p[1]+'».',BK,BT,1]));
function vq(n){const W=shuf(V),E=V.filter(w=>w.c=='E'),r=[],h=Math.ceil(n/2),f=Math.floor(n/3);
W.slice(0,h).forEach(w=>r.push(['voc','Vocabulario','¿Qué significa «'+w.en.split(' / ')[0]+'»?',w.es,w.en+' = '+w.es+'.',shuf(V.filter(x=>x.es!=w.es)).slice(0,3).map(x=>x.es).concat(w.es)]));
W.slice(h,h+f).forEach(w=>r.push(['voc','Vocabulario','Escribe en inglés: «'+w.es+'»',w.en.split(' / ').join('|'),'En inglés: '+w.en+'.']));
shuf(E).slice(0,Math.max(1,n-r.length)).forEach(w=>{const p=w.en.split(' / ');r.push(['voc','Vocabulario','Escribe el sustantivo que corresponde a «'+p[0].toLowerCase()+'».',p[1],p[0]+' → '+p[1]+'.'])});return r}
function simList(k){if(k==1)return EQ.concat(vq(12));if(k==2)return EQ2.concat(vq(12));
return shuf(EQ.concat(EQ2).filter(q=>!q[6])).slice(0,30).concat(EQ.filter(q=>q[6]),EQ2.filter(q=>q[6]),vq(14))}
function menuEx(){$('ed').innerHTML='<div class="card"><b>Elige un simulacro</b><p>Cada uno mezcla gramática y vocabulario. Las soluciones solo se ven al finalizar.</p></div>'+[['Simulacro 1','Gramática por temas, mixta, transformación y texto con huecos + 12 preguntas de vocabulario.'],['Simulacro 2','Otro conjunto de gramática + banco de palabras + 12 preguntas de vocabulario.'],['Simulacro 3','Mezcla al azar de todas las preguntas de gramática + vocabulario: cambia cada vez que lo empiezas.']].map((s,i)=>`<div class="card"><b>${s[0]}</b><br>${s[1]}<br><button class="b" style="margin-top:8px" onclick="startEx(${i+1})">Empezar</button></div>`).join('')}
const IV=`be|was/were|been|ser / estar
become|became|become|convertirse
begin|began|begun|empezar
break|broke|broken|romper
bring|brought|brought|traer
build|built|built|construir
buy|bought|bought|comprar
catch|caught|caught|atrapar
choose|chose|chosen|elegir
come|came|come|venir
cost|cost|cost|costar
cut|cut|cut|cortar
do|did|done|hacer
draw|drew|drawn|dibujar
drink|drank|drunk|beber
drive|drove|driven|conducir
eat|ate|eaten|comer
fall|fell|fallen|caer
feel|felt|felt|sentir
find|found|found|encontrar
fly|flew|flown|volar
forget|forgot|forgotten|olvidar
get|got|got|conseguir / obtener
give|gave|given|dar
go|went|gone|ir
grow|grew|grown|crecer
have|had|had|tener
hear|heard|heard|oír
hide|hid|hidden|esconder
hit|hit|hit|golpear
hold|held|held|sostener
keep|kept|kept|guardar / mantener
know|knew|known|saber / conocer
learn|learnt/learned|learnt/learned|aprender
leave|left|left|salir / dejar
lend|lent|lent|prestar
let|let|let|dejar / permitir
lose|lost|lost|perder
make|made|made|hacer / fabricar
mean|meant|meant|significar
meet|met|met|conocer / encontrarse
pay|paid|paid|pagar
put|put|put|poner
read|read|read|leer
ride|rode|ridden|montar
ring|rang|rung|sonar
run|ran|run|correr
say|said|said|decir
see|saw|seen|ver
sell|sold|sold|vender
send|sent|sent|enviar
sing|sang|sung|cantar
sit|sat|sat|sentarse
sleep|slept|slept|dormir
speak|spoke|spoken|hablar
spend|spent|spent|gastar / pasar tiempo
stand|stood|stood|estar de pie
steal|stole|stolen|robar
swim|swam|swum|nadar
take|took|taken|coger / tomar
teach|taught|taught|enseñar
tell|told|told|contar / decir
think|thought|thought|pensar
throw|threw|thrown|lanzar
understand|understood|understood|entender
wake|woke|woken|despertarse
wear|wore|worn|llevar puesto
win|won|won|ganar
write|wrote|written|escribir`.split('\n').map(l=>l.split('|'));
const IH='<tr><th>Infinitivo</th><th>Past Simple</th><th>Participio</th><th>Significado</th></tr>';let cur=[];const nd=s=>norm(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'');
function ri(){const q=norm($('iq').value);$('it').innerHTML=IH+IV.filter(v=>!q||norm(v.join(' ')).includes(q)).map(v=>`<tr><td><b>${v[0]}</b></td><td>${v[1]}</td><td>${v[2]}</td><td>${v[3]}</td></tr>`).join('')}
function ni(){const m=$('im').value;cur=shuf(IV).slice(0,20).map(v=>({v:v,h:[0,1,2,3].filter(c=>c!=(m=='2'?0:m=='3'?3:(Math.random()<.5?0:3)))}));
$('ip').innerHTML=IH+cur.map((r,i)=>'<tr>'+[0,1,2,3].map(c=>r.h.includes(c)?`<td><input type="text" id="c${i}_${c}" autocomplete="off" autocapitalize="off" spellcheck="false" style="margin:0"><div class="tag" id="x${i}_${c}"></div></td>`:`<td><b>${r.v[c]}</b></td>`).join('')+'</tr>').join('');$('ir').innerHTML=''}
function ci(){let t=0,g=0;cur.forEach((r,i)=>r.h.forEach(c=>{t++;const e=$('c'+i+'_'+c),a=r.v[c],k=a.split('/').map(nd).concat(nd(a)).includes(nd(e.value));if(k)g++;e.style.borderColor=k?'var(--ok)':'var(--ko)';e.style.background=k?'var(--okl)':'var(--kol)';$('x'+i+'_'+c).textContent=k?'':'→ '+a}));$('ir').innerHTML='<div class="fb '+(g==t?'ok':'ko')+'">Aciertos: '+g+' de '+t+'</div>'}
const ok=(q,v)=>q[2].split('|').some(x=>norm(x)==norm(v));
const inp=(q,n)=>q[6]?`<select name="${n}"><option value="">— elige —</option>${shuf(q[4]).map(o=>`<option>${o}</option>`).join('')}</select>`:q[4]?shuf(q[4]).map(o=>`<label class="o"><input type="radio" name="${n}" value="${o}"> ${o}</label>`).join(''):`<input type="text" name="${n}" autocomplete="off" spellcheck="false">`;
const val=n=>{const e=document.querySelector(`[name="${n}"]`);if(!e)return'';return e.type=='radio'?(document.querySelector(`[name="${n}"]:checked`)||{value:''}).value:e.value};

/* practice */
function rp(){$('pd').innerHTML=PQ.map((q,i)=>`<div class="card"><div class="tag">${q[0]=='Mixto'?'&nbsp;':q[0]}</div><div>${i+1}. ${q[1]}</div>${inp(q,'p'+i)}<button class="b" style="margin-top:8px" onclick="chk(${i})">Comprobar</button><div id="f${i}"></div></div>`).join('')+'<button class="b" onclick="rp();scrollTo(0,0)">Reiniciar y repetir todos los ejercicios</button>';}rp();
const MT={"have lived|have been living":"Present Perfect Simple (también vale Present Perfect Continuous)","watched":"Past Simple","had already eaten":"Past Perfect","has studied|has been studying":"Present Perfect Simple (también vale Present Perfect Continuous)","were having":"Past Continuous","have never seen":"Present Perfect Simple","went":"Past Simple","has been running":"Present Perfect Continuous","hasn't finished|has not finished":"Present Perfect Simple","were talking":"Past Continuous","had already left":"Past Perfect","has broken":"Present Perfect Simple","haven't seen|have not seen":"Present Perfect Simple","had visited":"Past Perfect","has been practising|has been practicing":"Present Perfect Continuous","haven't you":"Question tag (con have → Present Perfect)","met":"Past Simple"};
function chk(i){const q=PQ[i],v=val('p'+i),f=$('f'+i);if(!v){f.innerHTML='<div class="fb ko">Escribe o elige una respuesta.</div>';return}
 const T=q[0]=='Mixto'?(MT[q[2]]||''):q[0];f.innerHTML=ok(q,v)?`<div class="fb ok">✓ Correcto. ${q[3]}${q[0]=='Mixto'?'<br>Tiempo verbal: <b>'+T+'</b>':''}</div>`:`<div class="fb ko">✗ Incorrecto. Respuesta correcta: <b>${q[2].split('|')[0]}</b><br>${q[3]}<br>${q[0]=='Mixto'?'Tiempo verbal':'Recuerda'}: <b>${T}</b>.</div>`}

/* exam */
const BL={voc:'Bloque 1. Vocabulario',sp:'Bloque 2. Gramática por temas',mx:'Bloque 3. Gramática mixta',tr:'Bloque 4. Transformación y corrección'};
let ex=[];
let curSim=0;function startEx(k){curSim=k;const L=simList(k);ex=[];['voc','sp','mx','tr'].forEach(b=>shuf(L.filter(q=>q[0]==b&&!q[6])).concat(L.filter(q=>q[0]==b&&q[6])).forEach(q=>ex.push({b:b,q:q.slice(1),p:q[5]?1:2})));
 let h='<div class="card"><b>Instrucciones:</b> no se muestran soluciones hasta finalizar. Los huecos valen 2 puntos y las preguntas de opción múltiple 1. La nota se calcula sobre el total de puntos.</div>',cb='';
 let pg='';ex.forEach((e,i)=>{if(e.b!=cb){cb=e.b;h+=`<h3>${BL[cb]}</h3>`}if(e.q[5]&&e.q[5]!=pg){pg=e.q[5];h+=`<div class="card" style="background:var(--pl)"><b>${pg}</b>${e.q[6]?'<br>Banco: '+shuf(e.q[4]).join(' · '):''}</div>`}h+=`<div class="card"><div class="tag">Pregunta ${i+1} · ${e.p} pt</div><div>${e.q[1]}</div>${inp(e.q,'e'+i)}</div>`});
 h+='<div class="row"><button class="b s" onclick="rev()">Revisar respuestas</button><button class="b" onclick="fin()">Finalizar examen y corregir</button><button class="b s" onclick="menuEx()">Cambiar de simulacro</button></div><div id="rv"></div>';$('ed').innerHTML=h}
function rev(){const un=ex.map((e,i)=>val('e'+i)?0:i+1).filter(x=>x);$('rv').innerHTML=`<div class="fb ${un.length?'ko':'ok'}">${un.length?'Sin responder: preguntas '+un.join(', '):'Has respondido todas las preguntas.'}</div>`}
function fin(){const un=ex.filter((e,i)=>!val('e'+i)).length;
 let tot=0,got=0,okn=0,bl={},tn={},bad=[];
 ex.forEach((e,i)=>{const v=val('e'+i),c=v&&ok(e.q,v);tot+=e.p;if(c){got+=e.p;okn++}else bad.push({n:i+1,e:e,v:v});
  bl[e.b]=bl[e.b]||[0,0];bl[e.b][1]+=e.p;if(c)bl[e.b][0]+=e.p;
  if(e.b=='sp'){tn[e.q[0]]=tn[e.q[0]]||[0,0];tn[e.q[0]][1]++;if(c)tn[e.q[0]][0]++}});
 const nota=(got/tot*10).toFixed(1);
 let h=(un?`<div class="fb ko">Aviso: has dejado ${un} pregunta${un>1?'s':''} sin responder; cuentan como falladas.</div>`:'')+`<div class="card"><h2>Nota final: ${nota} / 10</h2><p>${got} de ${tot} puntos · ${okn} correctas · ${ex.length-okn} incorrectas</p></div><div class="card"><h3>Por bloques</h3>${Object.keys(bl).map(b=>`<p>${BL[b]}: ${bl[b][0]} / ${bl[b][1]} puntos</p>`).join('')}</div>
 <div class="card"><h3>Temas de gramática</h3>${Object.keys(tn).map(t=>{const r=tn[t][0]/tn[t][1];return `<p>${t}: ${tn[t][0]}/${tn[t][1]} — ${r>=.75?'<b style="color:var(--ok)">Lo dominas</b>':'<b style="color:var(--ko)">Necesitas repasarlo</b>'}</p>`}).join('')}</div>
 <h3>Preguntas falladas</h3>${bad.map(x=>`<div class="card ko"><div class="tag">Pregunta ${x.n} · ${x.e.q[0]}</div>${x.e.q[1]}<br>Tu respuesta: <b>${x.v||'(en blanco)'}</b><br>Correcta: <b>${x.e.q[2].split('|')[0]}</b><br>${x.e.q[3]}</div>`).join('')||'<p>¡Sin fallos!</p>'}
 <div class="row"><button class="b" onclick="startEx(curSim)">Repetir este simulacro</button><button class="b s" onclick="menuEx()">Elegir otro simulacro</button></div>`;$('ed').innerHTML=h;scrollTo(0,0)}
go('vocab');rv();ri();ni();menuEx();
