import { PhotoMemory, ShayariItem } from '../types';

// Target: 19 September 2026 at 00:00:00 Asia/Kolkata (IST = UTC+05:30)
// In UTC ISO-8601: 2026-09-18T18:30:00.000Z
export const BIRTHDAY_TARGET_ISO = '2026-09-18T18:30:00.000Z';
export const BIRTHDAY_DATE_DISPLAY = '19 September 2026, 00:00 IST';
export const BIRTHDAY_GIRL_NAME = 'Sumi';
export const BIRTHDAY_AGE = 21;

export const PHOTO_MEMORIES: PhotoMemory[] = [
  {
    id: 1,
    number: '01',
    theme: 'First impression / special beginning',
    emotionalLabel: 'SPECIAL BEGINNING',
    shortShayari: 'Ek tasveer, aur hazaar khoobsurat ehsaas.',
    detailedMemory: 'Serene waters and quiet breeze. The moment when an innocent smile became the calmest corner of my universe.',
    photoUrl: '/photo1.jpeg',
    fallbackUrls: ['/photos/photo1.jpeg', './photo1.jpeg', 'photo1.jpeg'],
    locationHint: 'Lakeside Serenity',
    objectPosition: 'center 20%',
  },
  {
    id: 2,
    number: '02',
    theme: 'Smile / timeless beauty',
    emotionalLabel: 'TIMELESS SMILE',
    shortShayari: 'Teri muskaan, door rehkar bhi roshan kar deti hai.',
    detailedMemory: 'Draped in traditional grace, sitting with that bashful, genuine smile that can brighten up the gloomiest day from hundreds of miles away.',
    photoUrl: '/photo2.jpeg',
    fallbackUrls: ['/photos/photo2.jpeg', './photo2.jpeg', 'photo2.jpeg'],
    locationHint: 'Traditional Banarasi Elegance',
    objectPosition: 'center 25%',
  },
  {
    id: 3,
    number: '03',
    theme: 'A beautiful candid memory',
    emotionalLabel: 'A BEAUTIFUL MOMENT',
    shortShayari: 'Kuch pal chhote hote hain, par yaadein hamesha ki hoti hain.',
    detailedMemory: 'A simple mirror selfie, floral tunic and unfiltered happiness. Proof that ordinary moments become extraordinary when it is you.',
    photoUrl: '/photo3.jpeg',
    fallbackUrls: ['/photos/photo3.jpeg', './photo3.jpeg', 'photo3.jpeg'],
    locationHint: 'Candid Joy',
    objectPosition: 'center 15%',
  },
  {
    id: 4,
    number: '04',
    theme: 'Missing her',
    emotionalLabel: 'MISSING HER COZINESS',
    shortShayari: 'Yaad aana bhi ek khoobsurat aadat ban gaya hai.',
    detailedMemory: 'Curly hair, black oversized sweatshirt, that adorable little pout. The picture I look at when the hostel room in Hyderabad feels too quiet.',
    photoUrl: '/photo4.jpeg',
    fallbackUrls: ['/photos/photo4.jpeg', './photo4.jpeg', 'photo4.jpeg'],
    locationHint: 'Playful Curls & Sweatshirt',
    objectPosition: 'center 20%',
  },
  {
    id: 5,
    number: '05',
    theme: 'Distance & quiet devotion',
    emotionalLabel: 'DEVOTION ACROSS DISTANCE',
    shortShayari: 'Faasle hain, par dil ki jagah wahi hai.',
    detailedMemory: 'In college uniform, working hard for your dreams every single morning. Separate cities, different routines, but one constant heartbeat.',
    photoUrl: '/photo5.jpeg',
    fallbackUrls: ['/photos/photo5.jpeg', './photo5.jpeg', 'photo5.jpeg'],
    locationHint: 'College Days & Dedication',
    objectPosition: 'center 20%',
  },
  {
    id: 6,
    number: '06',
    theme: 'Waiting to meet',
    emotionalLabel: 'THE SWEET ANTICIPATION',
    shortShayari: 'Har intezaar ke peeche ek khoobsurat mulaqat hoti hai.',
    detailedMemory: 'Eyes shut with that playful tap on your cheek. The cute mischief that makes counting the days until we finally meet so very worth it.',
    photoUrl: '/photo6.jpeg',
    fallbackUrls: ['/photos/photo6.jpeg', './photo6.jpeg', 'photo6.jpeg', '/photos/photo6 - Copy.jpeg', '/photo6 - Copy.jpeg'],
    locationHint: 'Playful Breeze & Scarf',
    objectPosition: 'center 25%',
  },
  {
    id: 7,
    number: '07',
    theme: 'Heart / emotional connection',
    emotionalLabel: 'HEART CONNECTION',
    shortShayari: 'Jitni doori, utni gehri yaad.',
    detailedMemory: 'Walking through lush green pathways, silver jhumkas swaying. No matter how many kilometers lie between us, you reside right here inside my chest.',
    photoUrl: '/photo7.jpeg',
    fallbackUrls: ['/photos/photo7.jpeg', './photo7.jpeg', 'photo7.jpeg'],
    locationHint: 'Nature Pathway & Jhumkas',
    objectPosition: 'center 20%',
  },
  {
    id: 8,
    number: '08',
    theme: 'Future memories',
    emotionalLabel: 'FUTURE MEMORIES',
    shortShayari: 'Kal ke khoobsurat pal aaj se hi dil mein hain.',
    detailedMemory: 'Graceful white floral kurti. Looking at you makes me dream of all the trips, tea stalls, long walks, and quiet sunsets waiting for us in tomorrow.',
    photoUrl: '/photo8.jpeg',
    fallbackUrls: ['/photos/photo8.jpeg', './photo8.jpeg', 'photo8.jpeg'],
    locationHint: 'Graceful Floral Kurti',
    objectPosition: 'center 20%',
  },
  {
    id: 9,
    number: '09',
    theme: 'Birthday / forever wish',
    emotionalLabel: 'FOREVER WISH & 21',
    shortShayari: 'Happy Birthday to the girl who makes every memory special. ❤️',
    detailedMemory: 'Bathed in magical pink neon light. 21 looks breathtaking on you, Sumi. Today, tomorrow, and every year ahead, keep glowing like the star you are.',
    photoUrl: '/photo9.jpeg',
    fallbackUrls: ['/photos/photo9.jpeg', './photo9.jpeg', 'photo9.jpeg'],
    locationHint: 'Neon Holographic Night',
    objectPosition: 'center 25%',
  },
];

export const SHAYARIS: ShayariItem[] = [
  {
    id: 1,
    hindi: 'Faasle chahe jitne bhi ho,\ndil se dil ka rishta kam nahi hota,\ntu paas na ho kar bhi,\nhar pal mere khayalon mein hoti hai.',
    translation: 'No matter the miles, the bond between hearts never wanes; even far away, you dwell in every breath of my thoughts.',
  },
  {
    id: 2,
    hindi: 'Shehron ki doori kya hai,\njab dil mein kisi ki jagah ho,\nraaste chahe kitne bhi lambe ho,\nhar mod par usi ki yaad ho.',
    translation: 'What are the distance of cities when someone owns your heart? However long the roads may stretch, every turn reminds me of you.',
  },
  {
    id: 3,
    hindi: 'Milne ki khwahish roz hoti hai,\npar intezaar bhi khoobsurat lagta hai,\nkyunki har guzarta din\ntum tak pahunchne ke aur kareeb lagta hai.',
    translation: 'The desire to meet awakens every day, yet even waiting feels beautiful, because each passing day brings me one step closer to you.',
  },
  {
    id: 4,
    hindi: 'Door rehkar bhi tu itni kareeb hai,\njaise har khamoshi mein teri awaaz hai,\nhar tasveer mein tera chehra,\naur har dua mein tera naam hai.',
    translation: 'Even from afar, you feel so close—your voice in every quiet pause, your face in every picture, your name in every prayer.',
  },
  {
    id: 5,
    hindi: 'Dooriyan sirf itna batati hain,\nki milna kitna khaas hoga,\naur jab saamne hogi,\nshayad waqt bhi thoda theher jayega.',
    translation: 'Distances only remind us how precious our meeting will be; and when you stand before me, even time will pause to watch.',
  },
  {
    id: 6,
    hindi: 'Na har pal saath hona zaroori hai,\nna har baat kehna zaroori hai,\nkuch rishte bas mehsoos hote hain,\naur wahi sabse khoobsurat hote hain.',
    translation: 'Not every second needs proximity, nor every feeling need words; some bonds are simply felt in the soul, and those are the most beautiful.',
  },
  {
    id: 7,
    hindi: 'Ek din ye faasle bhi khatam honge,\nraaste hum dono ko mila denge,\naaj jo yaadein tasveeron mein hain,\nkal wahi pal saath jeeyenge.',
    translation: 'One day these distances will dissolve, roads will bring us together; the memories we cherish in photos today, we will live hand in hand tomorrow.',
  },
  {
    id: 8,
    hindi: 'Is khaas din bas itni si dua hai,\ntere chehre ki muskaan kabhi kam na ho,\nzindagi tujhe har woh khushi de,\njiski tu haqdar hai.',
    translation: 'On this sacred day, my only prayer is that your smile never dims, and life bestows upon you every ounce of happiness you deserve.',
  },
];

export const UNTIL_WE_MEET_CARD = {
  title: 'UNTIL WE MEET',
  text: `Abhi raaste alag hain,
shehar alag hain,
aur hum thode door hain...

Lekin har khoobsurat yaad,
har smile,
aur har chhoti si baat
dil ko tumhare aur paas le aati hai.

Kuch dooriyan sirf milne ka
intezaar aur khoobsurat bana deti hain. ❤️`,
};

export const FINAL_SHAYARI_CARD = {
  heading: 'ONE LAST SHAYARI',
  text: `Kal kitna bhi door ho,
aaj tera birthday hai...

Aur aaj bas itna kehna hai,
ki tum hamesha yunhi muskurati raho,
khush raho,
aur tumhari har dua poori ho.

Happy 21st Birthday, Sumi. ❤️`,
  subheading: 'UNTIL THE NEXT MEMORY',
};
