"""add size units

Revision ID: 1.7.1
Revises: 1.6.3
Create Date: 2023-04-15 02:28:24.023871

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1.7.1'
down_revision = '1.6.3'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('roms', sa.Column('file_size_units', sa.String(length=10), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('roms', 'file_size_units')
    # ### end Alembic commands ###
