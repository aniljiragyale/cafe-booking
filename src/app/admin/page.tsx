'use client';

import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

type Booking = Record<string, any>;
type Inquiry = Record<string, any>;
const adminHeaders = (pin: string) => ({ 'x-kirik-admin-pin': pin });
const displayDate = (value: string) => value ? new Date(value).toLocaleString('en-IN') : '';

export default function Page() {
  const [pin, setPin] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [busy, setBusy] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [enquiries, setEnquiries] = useState<Inquiry[]>([]);

  async function loadAdmin(key: string) {
    setBusy(true);
    setError('');
    try {
      const [bookingRes, inquiryRes] = await Promise.all([
        fetch('/api/bookings', { headers: adminHeaders(key), cache: 'no-store' }),
        fetch('/api/inquiries', { headers: adminHeaders(key), cache: 'no-store' }),
      ]);
      if (!bookingRes.ok || !inquiryRes.ok) throw new Error('That admin PIN did not work.');
      const bookingData = await bookingRes.json();
      const inquiryData = await inquiryRes.json();
      setBookings(bookingData.bookings);
      setEnquiries(inquiryData.inquiries);
      setAuthorized(true);
      sessionStorage.setItem('kirik-admin-pin', key);
    } catch (reason) {
      setAuthorized(false);
      sessionStorage.removeItem('kirik-admin-pin');
      setError(reason instanceof Error ? reason.message : 'Could not load bookings.');
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    const stored = sessionStorage.getItem('kirik-admin-pin');
    if (stored) { setPin(stored); void loadAdmin(stored); }
  }, []);

  async function update(id: string, status: 'Approved' | 'Declined') {
    setError('');
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { ...adminHeaders(pin), 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not update booking.');
      setBookings(items => items.map(item => item.id === id ? result.booking : item));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Could not update booking.');
    }
  }

  async function downloadExcel() {
    setExporting(true);
    setError('');
    try {
      const ExcelJS = await import('exceljs');
      const workbook = new ExcelJS.Workbook();
      workbook.creator = 'Kirik Party';
      workbook.created = new Date();

      const bookingSheet = workbook.addWorksheet('Bookings', { views: [{ state: 'frozen', ySplit: 1 }] });
      bookingSheet.columns = [
        { header: 'Booking Ref', key: 'id', width: 20 }, { header: 'Created', key: 'createdAt', width: 23 },
        { header: 'Status', key: 'status', width: 14 }, { header: 'Customer', key: 'name', width: 24 },
        { header: 'Email', key: 'email', width: 30 }, { header: 'Phone', key: 'phone', width: 18 },
        { header: 'Celebration', key: 'celebration', width: 22 }, { header: 'Event Date', key: 'date', width: 16 },
        { header: 'Time Slot', key: 'time', width: 18 }, { header: 'Space', key: 'theatre', width: 18 },
        { header: 'Package', key: 'pack', width: 34 }, { header: 'Guests', key: 'guests', width: 10 },
        { header: 'Add-ons', key: 'addons', width: 42 }, { header: 'Food Request', key: 'food', width: 20 },
        { header: 'Chocolates', key: 'chocolates', width: 14 }, { header: 'Notes', key: 'notes', width: 40 },
        { header: 'Estimated Total (INR)', key: 'price', width: 22 },
      ];
      bookings.forEach(b => bookingSheet.addRow({
        id: b.id, createdAt: displayDate(b.createdAt), status: b.status, name: b.name, email: b.email,
        phone: b.phone, celebration: b.celebration, date: b.date, time: b.time, theatre: b.theatre,
        pack: b.pack, guests: b.guests, addons: Array.isArray(b.addons) ? b.addons.join(', ') : '',
        food: b.food || 'None', chocolates: b.chocolates ? 'Requested' : 'No', notes: b.notes || '', price: b.price,
      }));

      const enquirySheet = workbook.addWorksheet('Enquiries', { views: [{ state: 'frozen', ySplit: 1 }] });
      enquirySheet.columns = [
        { header: 'Enquiry Ref', key: 'id', width: 20 }, { header: 'Created', key: 'createdAt', width: 23 },
        { header: 'Name', key: 'name', width: 24 }, { header: 'Email', key: 'email', width: 30 },
        { header: 'Phone', key: 'phone', width: 18 }, { header: 'Occasion', key: 'occasion', width: 22 },
        { header: 'Message', key: 'message', width: 60 },
      ];
      enquiries.forEach(q => enquirySheet.addRow({ ...q, createdAt: displayDate(q.createdAt) }));

      for (const sheet of [bookingSheet, enquirySheet]) {
        const header = sheet.getRow(1);
        header.height = 24;
        header.eachCell(cell => {
          cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF30271B' } };
          cell.alignment = { vertical: 'middle' };
        });
        sheet.autoFilter = { from: 'A1', to: `${sheet.getColumn(sheet.columnCount).letter}1` };
        sheet.eachRow((row, rowNumber) => {
          if (rowNumber > 1 && rowNumber % 2 === 0) row.eachCell(cell => {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFAF6EF' } };
          });
          row.eachCell(cell => { cell.alignment = { ...cell.alignment, vertical: 'top', wrapText: true }; });
        });
      }
      bookingSheet.getColumn('price').numFmt = '₹#,##0';

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `kirik-party-records-${new Date().toISOString().slice(0, 10)}.xlsx`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (reason) {
      setError(reason instanceof Error ? `Excel download failed: ${reason.message}` : 'Excel download failed.');
    } finally {
      setExporting(false);
    }
  }

  function logout() {
    sessionStorage.removeItem('kirik-admin-pin');
    setAuthorized(false); setPin(''); setBookings([]); setEnquiries([]);
  }
  const stats: [string, number][] = [['Celebration space', 1], ['Package options', 3], ['Booking requests', bookings.length], ['New enquiries', enquiries.length]];

  return <><section className="page-hero"><div className="wrap"><div className="eyebrow">Kirik Party · workspace</div><h1>Admin dashboard.</h1><p className="muted" style={{ color: '#ccc' }}>Bookings and enquiries saved on the Kirik Party server.</p></div></section><section className="section"><div className="wrap">
    {!authorized ? <form className="admin-login form-card" onSubmit={e => { e.preventDefault(); void loadAdmin(pin); }}><h2 className="serif">Admin sign in</h2><p className="muted">Enter the admin PIN from your private environment settings.</p><div className="form-group"><label htmlFor="admin-pin">Admin PIN</label><input id="admin-pin" type="password" value={pin} onChange={e => setPin(e.target.value)} required autoComplete="current-password" /></div>{error && <p className="form-error" role="alert">{error}</p>}<button className="btn btn-dark" disabled={busy}>{busy ? 'Checking…' : 'View bookings'}</button></form> :
      <><div className="admin-toolbar"><div className="admin-stats">{stats.map(([label, value]) => <div className="stat" key={label}><span className="muted">{label}</span><strong>{value}</strong></div>)}</div><div className="admin-toolbar-actions"><button className="btn btn-dark" onClick={() => void loadAdmin(pin)} disabled={busy}>Refresh</button><button className="btn btn-dark" onClick={() => void downloadExcel()} disabled={exporting}><Download size={16} />{exporting ? 'Preparing…' : 'Download Excel'}</button><button className="btn" onClick={logout}>Sign out</button></div></div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <h2 className="serif admin-section-title">Booking requests</h2>{bookings.length ? bookings.map(b => <article key={b.id} className="admin-booking"><div className="admin-booking-info"><b>{b.name} · {b.celebration}</b><span>{b.email} · {b.phone}</span><span>{b.date} · {b.time}</span><span>{b.guests} guests · {b.pack}</span><span>Estimated total: ₹{b.price?.toLocaleString('en-IN')}</span>{b.addons?.length > 0 && <span>Add-ons: {b.addons.join(', ')}</span>}{b.food && b.food !== 'None' && <span>Food request: {b.food}</span>}{b.chocolates && <span>Homemade chocolates requested in advance</span>}{b.notes && <span>Notes: {b.notes}</span>}<small>Booking ref: {b.id} · {displayDate(b.createdAt)}</small></div><div className="admin-booking-actions"><span className="tag">{b.status}</span>{b.status === 'Pending' && <><button className="btn btn-dark" onClick={() => void update(b.id, 'Approved')}>Approve</button><button className="btn" onClick={() => void update(b.id, 'Declined')}>Decline</button></>}</div></article>) : <p className="muted">No booking requests yet.</p>}
        <h2 className="serif admin-section-title">Customer enquiries</h2>{enquiries.length ? enquiries.map(q => <article key={q.id} className="admin-booking"><div className="admin-booking-info"><b>{q.name} · {q.occasion || 'General question'}</b><span>{q.email} · {q.phone}</span><span>{q.message}</span><small>Enquiry ref: {q.id} · {displayDate(q.createdAt)}</small></div></article>) : <p className="muted">No enquiries yet.</p>}</>}
    <div className="notice">Requests are stored on this Node.js server in <code>data/kirik-party-data.json</code>. Keep this file private and back it up. Use durable server storage if deploying to a serverless host.</div>
  </div></section></>;
}
