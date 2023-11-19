import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { User } from 'src/app/core/interfaces/user';
import { SelectValue } from 'src/app/core/modules/select/select.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [CommonModule, SelectModule, ReactiveFormsModule],
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomSelectComponent implements OnInit {
  selectValue: FormControl<SelectValue<User>> = new FormControl(new User(1, 'Popov Pavel', 'Pavel', 'Russia'));
  users: User[] = [
    new User(1, 'Popov Pavel', 'Pavel', 'Russia'),
    new User(2, 'Ekaterina Brig', 'Ekaterina', 'Russia'),
    new User(3, 'Albert Cancook', 'Albert', 'Belorussia'),
    new User(4, 'Marie Curie', 'Marie', 'Poland', true),
    new User(5, 'Popov Pavel', 'Pavel', 'Russia'),
    new User(6, 'Ekaterina Brig', 'Ekaterina', 'Russia'),
    new User(7, 'Albert Cancook', 'Albert', 'Belorussia'),
    new User(8, 'Marie Curie', 'Marie', 'Poland', true),
  ]
  filteredUsers = this.users;
  onSelectionChanged(value: unknown | null) {
    console.log(value)
  }

  ngOnInit(): void {
    this.selectValue.valueChanges.subscribe(this.onSelectionChanged)
  }

  displayWithFn(user: User) {
    return user.name;
  }

  compareWithFn(v1: User | null, v2: User | null) {
    return v1?.id === v2?.id
  }

  onSearchChanged(queryString: string) {
    this.filteredUsers = this.users.filter(user => user.name.toLowerCase().startsWith(queryString.toLowerCase()))
  }
}
