import { trigger, transition, style, animate, query } from '@angular/animations';

export const routeAnimation =

  trigger('routeSliding', [
    transition('editor => stepper', [
      query(':enter', [
        style({ transform: `translateX(120%)`, position: 'absolute' })
      ]),
      query(':leave', [
        style({ transform: '*', position: 'absolute' })
      ]),
      query(':leave', [
        animate('0.3s', style({ transform: `translateX(-120%)` }))
      ], { optional: true }),
      query(':enter', [
        animate('0.3s', style({ transform: '*' }))
      ], { optional: true })
    ]),
    transition('editor => home', [
      query(':enter', [
        style({ transform: `translateX(-120%)`, position: 'absolute' })
      ]),
      query(':leave', [
        style({ transform: '*', position: 'absolute' })
      ]),
      query(':leave', [
        animate('0.3s', style({ transform: `translateX(120%)` }))
      ], { optional: true }),
      query(':enter', [
        animate('0.3s', style({ transform: '*' }))
      ], { optional: true })
    ]),
    transition('stepper => editor', [
      query(':enter', [
        style({ transform: `translateX(-120%)`, position: 'absolute' })
      ]),
      query(':leave', [
        style({ transform: '*', position: 'absolute' })
      ]),
      query(':leave', [
        animate('0.3s', style({ transform: `translateX(120%)` }))
      ], { optional: true }),
      query(':enter', [
        animate('0.3s', style({ transform: '*' }))
      ], { optional: true })
    ]),
    transition('stepper => home', [
      query(':enter', [
        style({ transform: `translateX(-120%)`, position: 'absolute' })
      ]),
      query(':leave', [
        style({ transform: '*', position: 'absolute' })
      ]),
      query(':leave', [
        animate('0.3s', style({ transform: `translateX(120%)` }))
      ], { optional: true }),
      query(':enter', [
        animate('0.3s', style({ transform: '*' }))
      ], { optional: true })
    ]),
    transition('home => stepper', [
      query(':enter', [
        style({ transform: `translateX(120%)`, position: 'absolute' })
      ]),
      query(':leave', [
        style({ transform: '*', position: 'absolute' })
      ]),
      query(':leave', [
        animate('0.3s', style({ transform: `translateX(-120%)` }))
      ], { optional: true }),
      query(':enter', [
        animate('0.3s', style({ transform: '*' }))
      ], { optional: true })
    ]),
    transition('home => editor', [
      query(':enter', [
        style({ transform: `translateX(120%)`, position: 'absolute' })
      ]),
      query(':leave', [
        style({ transform: '*', position: 'absolute' })
      ]),
      query(':leave', [
        animate('0.3s', style({ transform: `translateX(-120%)` }))
      ], { optional: true }),
      query(':enter', [
        animate('0.3s', style({ transform: '*' }))
      ], { optional: true })
    ]),
    transition('export => editor', [
      query(':enter', [
        style({ transform: `translateY(100%)`, position: 'absolute' })
      ]),
      query(':leave', [
        style({ transform: '*', position: 'absolute' })
      ]),
      query(':leave', [
        animate('0.3s', style({ transform: `translateY(-100%)` }))
      ], { optional: true }),
      query(':enter', [
        animate('0.3s', style({ transform: '*' }))
      ], { optional: true })
    ]),
    transition('export => home', [
      query(':enter', [
        style({ transform: `translateY(100%)`, position: 'absolute' })
      ]),
      query(':leave', [
        style({ transform: '*', position: 'absolute' })
      ]),
      query(':leave', [
        animate('0.3s', style({ transform: `translateY(-100%)` }))
      ], { optional: true }),
      query(':enter', [
        animate('0.3s', style({ transform: '*' }))
      ], { optional: true })
    ])
  ]);

export const duckToggle =
  trigger('duckToggle', [
    transition(':enter', [
      style({ transform: 'translateY(7rem)' }),
      animate('0.3s ease-in', style({ transform: '*' })),
    ]),
    transition(':leave', [
      animate('0.3s ease-out', style({ transform: 'translateY(7rem)' }))
    ])
  ]);

export const btnTrigger =
  trigger('btnTrigger', [
    transition('menu => close', [
      animate('0.2s ease-in', style({ transform: 'rotateZ(0.25turn)' })),
    ]),
    transition('close => menu', [
      style({ transform: 'rotateZ(0.25turn)' }),
      animate('0.2s ease-in', style({ transform: '*' })),
    ])
  ]);

  // trigger('routeSliding', [
  //   transition('editor => stepper', slideHorizontallyTo('left')),
  //   transition('editor => home', slideHorizontallyTo('right')),
  //   transition('stepper => editor', slideHorizontallyTo('right')),
  //   transition('stepper => home', slideHorizontallyTo('right')),
  //   transition('home => stepper', slideHorizontallyTo('left')),
  //   transition('home => editor', slideHorizontallyTo('left')),
  //   transition('export => editor', slideVerticallyTo('down')),
  //   transition('export => home', slideVerticallyTo('down'))
  // ]);

// export function slideHorizontallyTo(direction) {
//   const c1 = direction === 'right' ? '-' : '';
//   const c2 = direction === 'left' ? '-' : '';
//   const optional = { optional: true };
//   return [
//     query(':enter', [
//       style({ transform: `translateX(${c1}120%)`, position: 'absolute' })
//     ]),
//     query(':leave', [
//       style({ transform: '*', position: 'absolute' })
//     ]),
//     query(':leave', [
//       animate('0.3s', style({ transform: `translateX(${c2}120%)` }))
//     ], optional),
//     query(':enter', [
//       animate('0.3s', style({ transform: '*' }))
//     ], optional)
//   ]
// }
//
// export function slideVerticallyTo(direction) {
//   const c1 = direction === 'down' ? '' : '-';
//   const c2 = direction === 'up' ? '' : '-';
//   const optional = { optional: true };
//   return [
//     query(':enter', [
//       style({ transform: `translateY(${c1}100%)`, position: 'absolute' })
//     ]),
//     query(':leave', [
//       style({ transform: '*', position: 'absolute' })
//     ]),
//     query(':leave', [
//       animate('0.3s', style({ transform: `translateY(${c2}100%)` }))
//     ], optional),
//     query(':enter', [
//       animate('0.3s', style({ transform: '*' }))
//     ], optional)
//   ]
// }
