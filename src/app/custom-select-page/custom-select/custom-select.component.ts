import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { User } from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [CommonModule, SelectModule],
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomSelectComponent {
  selectValue = new User(1, 'Popov Pavel', 'Pavel', 'Russia');
  users: User[] = [
    new User(1, 'Popov Pavel', 'Pavel', 'Russia'),
    new User(2, 'Ekaterina Brig', 'Ekaterina', 'Russia'),
    new User(3, 'Albert Cancook', 'Albert', 'Belorussia'),
    new User(4, 'Marie Curie', 'Marie', 'Poland', true),
  ]
  onSelectionChanged(value: unknown | null) {
    console.log(value)
  }

  displayWithFn(user: User) {
    console.log(user.name)
    return user.name;
  }
}
