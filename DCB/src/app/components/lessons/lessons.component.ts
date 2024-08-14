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
      description: `Maintaining proper distance while driving is crucial for ensuring safety on the road. The recommended following distance, often referred to as the "three-second rule," allows drivers to react promptly to sudden changes in traffic, such as a vehicle stopping abruptly or an unexpected obstacle. This distance gives drivers enough time to brake smoothly without causing a collision, reducing the risk of rear-end accidents. Proper distance also enhances visibility, allowing drivers to anticipate potential hazards and make informed decisions.

      In addition to improving safety, maintaining a safe distance fosters a more relaxed driving environment. Drivers who keep an appropriate distance are less likely to engage in aggressive driving behaviors, such as tailgating, which can lead to road rage and dangerous situations. By practicing this habit consistently, drivers contribute to a smoother traffic flow and create a more predictable driving experience for everyone on the road.`,
      link: 'https://www.drive-safely.net/safe-following-distance/'
    },
    {
      title: 'Use Turn Signals',
      photo: 'assets/tips/turnsignal.jpg',
      description: `Using turn signals is an essential part of safe driving, as it communicates your intentions to other road users. Signaling early gives drivers around you ample time to adjust their speed and position, reducing the likelihood of accidents caused by sudden lane changes or turns. Whether you are merging onto a highway, changing lanes, or making a turn, your signal provides clear and necessary information that contributes to the overall flow of traffic.

      Beyond safety, consistent use of turn signals demonstrates responsible and courteous driving behavior. It helps build trust among drivers, as everyone on the road can anticipate your actions. This not only prevents misunderstandings but also helps to avoid traffic disruptions. Remember, using your turn signals is not just a legal requirement; it's a fundamental aspect of being a conscientious driver.`,
      link: 'https://www.wikihow.com/Use-Your-Turn-Signal'
    },
    {
      title: 'Check Blind Spots',
      photo: 'assets/tips/BlindSpot.jpg',
      description: `Checking blind spots is a critical step before changing lanes or making a turn. Blind spots are areas around your vehicle that are not visible through your mirrors, and failing to check them can lead to collisions with vehicles that are just out of your line of sight. By taking a moment to glance over your shoulder and check your blind spots, you ensure that no vehicles, cyclists, or pedestrians are in your path, making your lane change or turn safer.

      Regularly checking blind spots also reinforces your situational awareness, a key aspect of defensive driving. It helps you stay aware of your surroundings, anticipate potential hazards, and react appropriately. Developing this habit will make you a more vigilant driver, reducing the risk of accidents and ensuring a safer driving experience for everyone on the road.`,
      link: 'https://goodcar.com/blog/what-is-a-blind-spot-when-driving'
    },
    {
      title: 'Avoid Distractions',
      photo: 'assets/tips/distratctions.jpg',
      description: `Avoiding distractions while driving is one of the most important safety practices. Distractions, such as using a mobile phone, eating, or adjusting the radio, can significantly reduce your focus on the road, leading to slower reaction times and increased chances of accidents. Even a momentary lapse in attention can have serious consequences, making it crucial to keep your eyes on the road and hands on the wheel at all times.

      By minimizing distractions, you enhance your ability to respond to unexpected situations, such as sudden stops or obstacles. Staying focused allows you to drive more predictably, which benefits not only you but also other road users. Remember, a moment of inattention can change your life forever; staying focused on the road is essential for safe driving.`,
      link: 'https://www.wikihow.life/Avoid-Distracted-Driving'
    },
    {
      title: 'Observe Speed Limits',
      photo: 'assets/tips/speed-limits.jpg',
      description: `Observing speed limits is a fundamental rule of road safety. Speed limits are set based on road conditions, traffic patterns, and the surrounding environment to protect all road users. Driving at the posted speed limits allows you to maintain control of your vehicle and react appropriately to any changes in traffic or road conditions. Speeding, on the other hand, reduces your reaction time and increases the severity of accidents.

      Following speed limits also contributes to a smoother flow of traffic and reduces the likelihood of accidents caused by sudden braking or lane changes. It reflects a responsible driving attitude and ensures that you are doing your part to keep the roads safe for everyone. Remember, speed limits are in place to save lives; adhering to them is not just about avoiding fines, but about ensuring your safety and the safety of others.`,
      link: 'https://en.wikipedia.org/wiki/Speed_limits_in_India'
    },
    {
      title: 'Wear Your Seatbelt',
      photo: 'assets/tips/Seat-Belt.jpg',
      description: `Wearing your seatbelt is one of the simplest and most effective ways to protect yourself in a vehicle. Seatbelts are designed to keep you securely in place during a collision, reducing the risk of injury by preventing you from being thrown around inside the car or ejected from it. Whether you're driving or riding as a passenger, on a short trip or a long journey, wearing a seatbelt is essential for your safety.

      Beyond its protective function, wearing a seatbelt sets a positive example for others, especially younger passengers who learn safety habits from the adults around them. It also complies with the law in most places, reinforcing the importance of safety on the road. Never underestimate the life-saving power of a seatbelt—buckle up every time you get into a vehicle.`,
      link: 'https://www.nhtsa.gov/vehicle-safety/seat-belts'
    }
  ];
}
