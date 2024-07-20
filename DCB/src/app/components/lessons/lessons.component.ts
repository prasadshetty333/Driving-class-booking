import { Component } from '@angular/core';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent {
  drivingTips = [
    {
      title: 'Maintain Proper Distance',
      photo: 'assets/tips/safedistance.jpg',
      description: 'Always maintain a safe following distance between your vehicle and the one ahead of you.',
      link: 'https://www.drive-safely.net/safe-following-distance/'
    },
    {
      title: 'Use Turn Signals',
      photo: 'assets/tips/turnsignal.jpg',
      description: 'Signal your intentions early to inform other drivers of your actions.',
      link: 'https://www.wikihow.com/Use-Your-Turn-Signal'
    },
    {
      title: 'Check Blind Spots',
      photo: 'assets/tips/BlindSpot.jpg',
      description: 'Before changing lanes or making a turn, check your blind spots to ensure no vehicles are beside you.',
      link: 'https://goodcar.com/blog/what-is-a-blind-spot-when-driving'
    },
    {
      title: 'Avoid Distractions',
      photo: 'assets/tips/distratctions.jpg',
      description: 'Keep your attention on the road and avoid using mobile phones or other distractions while driving.',
      link: 'https://www.wikihow.life/Avoid-Distracted-Driving'
    },
    {
      title: 'Observe Speed Limits',
      photo: 'assets/tips/speed-limits.jpg',
      description: 'Follow the posted speed limits to ensure your safety and that of others on the road.',
      link: 'https://en.wikipedia.org/wiki/Speed_limits_in_India'
    },
    {
      title: 'Wear Your Seatbelt',
      photo: 'assets/tips/Seat-Belt.jpg',
      description: 'Always wear your seatbelt, no matter how short the trip is.',
      link: 'https://www.nhtsa.gov/vehicle-safety/seat-belts'
    }
  ];
}
