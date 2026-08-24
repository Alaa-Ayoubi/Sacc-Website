/* "Enquire about X" from anywhere on the site.
 *
 * The sections that offer this are now on their own routes, so the subject
 * travels to the contact page in router state rather than being lifted into a
 * shared parent. The contact form reads it once and clears it, so a refresh or
 * a later visit starts blank.
 */
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useInquire() {
  const navigate = useNavigate();
  return useCallback(
    (subject) => navigate('/contact', { state: { subject } }),
    [navigate],
  );
}
