import { Component, Input } from '@angular/core';
import { Contact } from '../contact.model'
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})


export class ContactDetailComponent {
  @Input() contact: Contact | undefined;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.contact = this.contactService.getContact(params['id']);
        }
      );
  }

  onDelete() {
    if (this.contact) {
      this.contactService.deleteContact(this.contact);
      this.router.navigateByUrl('/contacts');
    }
  }

  get_detail_list(contact: Contact) {
    /**
     * Returns list of details to display
     */
    let detail_list = [];
    detail_list.push(
      { name: "Email", value: contact.email }
    )
    detail_list.push(
      { name: "Phone", value: contact.phone }
    )
    return detail_list;
  }

}
