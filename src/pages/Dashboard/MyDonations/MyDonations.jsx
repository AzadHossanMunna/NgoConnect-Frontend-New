import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaTrashCan, FaHandHoldingHeart } from 'react-icons/fa6';

const MyDonations = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: donations = [], refetch } = useQuery({
    queryKey: ['my-donations', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations?email=${user.email}`);
      return res.data;
    }
  });

  const handleDeleteDonation = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This donation record will be removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/donations/${id}`)
          .then(res => {
            if (res.data.deletedCount) {
              refetch();
              Swal.fire("Deleted!", "Donation record removed.", "success");
            }
          });
      }
    });
  };

  const handlePayment = async (donation) => {
    const paymentInfo = {
      amount: donation.amount,
      donationId: donation._id,
      donorEmail: user.email,
      cause: donation.cause
    };

    const res = await axiosSecure.post('/donation-payment-session', paymentInfo);
    window.location.assign(res.data.url);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">
        My Donations ({donations.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Cause</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {donations.map((donation, index) => (
              <tr key={donation._id}>
                <td>{index + 1}</td>
                <td className="capitalize">{donation.cause}</td>
                <td>৳{donation.amount}</td>

                <td>
                  {donation.paymentStatus === 'paid' ? (
                    <span className="text-green-500 font-semibold">Paid</span>
                  ) : (
                    <button
                      onClick={() => handlePayment(donation)}
                      className="btn btn-sm btn-success text-white"
                    >
                      Pay Now
                    </button>
                  )}
                </td>

                <td>
                  {new Date(donation.createdAt).toLocaleDateString()}
                </td>

                <td>
                  <button
                    onClick={() => handleDeleteDonation(donation._id)}
                    className="btn btn-square btn-sm hover:bg-red-500"
                  >
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {donations.length === 0 && (
        <div className="text-center mt-10 text-gray-500">
          <FaHandHoldingHeart className="mx-auto text-4xl mb-2" />
          You have not made any donations yet.
        </div>
      )}
    </div>
  );
};

export default MyDonations;
